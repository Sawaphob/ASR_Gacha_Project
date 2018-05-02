import React, { Component } from 'react'
import Money from '../component/Money'
import Token from '../component/Token'
import Collection from '../component/Collection'
import Video from '../component/Video'
import Microphone from '../component/Microphone'
import myWorker from "../lib/recorderWorker.js"
import styled, { keyframes } from 'styled-components'
//let myWorker = require("../lib/recorderWorker.js");
import gachaResolve from '../data/gachaResolve.json'

const exchangeRate = {1: 35, 10: 200, 100: 1600, 1000: 13000}

var list = [
    {sentence:"เปิด หนึ่ง", action: 'randomGachaWithNumber', params: 1},
    {sentence:"เปิด สิบ", action: 'randomGachaWithNumber', params: 10},
    {sentence:"เปิด หา อาจารย์ เอกพล", action: 'randomGachaSpecific', params: 'ekapol'},
    {sentence:"เปิด หา อาจารย์ อติวงศ์", action: 'randomGachaSpecific', params: 'atiwong'},
    {sentence:"เติม เงิน หนึ่ง บาท", action: 'addMoney', params: 1},
    {sentence:"เติม เงิน สิบ บาท", action: 'addMoney', params: 10},
    {sentence:"เติม เงิน ร้อย บาท", action: 'addMoney', params: 100},
    {sentence:"เติม เงิน พัน บาท", action: 'addMoney', params: 1000},
    {sentence:"เติม เพชร สิบ", action: 'addToken', params: 10},
    {sentence:"เติม เพชร ร้อย", action: 'addToken', params: 100},
    {sentence:"เติม เพชร พัน", action: 'addToken', params: 1000},
    {sentence:"แสดง คอลเลคชั่น", action: 'openCollection'},
    {sentence:"โชว์ คอลเลคชั่น", action: 'openCollection'},
    {sentence:"แสดง กาชา", action: 'closeCollection'},
    {sentence:"โชว์ กาชา", action: 'closeCollection'},
    {sentence:"โกง คอลเลคชั่น", action: 'cheatCollection'},
    {sentence:"โกง เอา อาจารย์ เอกพล", action: 'cheatProfessor', params: 'ekapol'},
    {sentence:"โกง เอา อาจารย์ อรรถสิทธิ์", action: 'cheatProfessor', params: 'athasit'},
    {sentence:"โกง เอา อาจารย์ อติวงศ์", action: 'cheatProfessor', params: 'atiwong'},
    {sentence:"โกง เอา อา", action: 'cheatRarity', params: 'R'},
    {sentence:"โกง เอา เอส อา", action: 'cheatRarity', params: 'SR'},
    {sentence:"โกง เอา เอ เอส อา", action: 'cheatRarity', params: 'ASR'},
    {sentence:"หยุด", action: 'skipGacha'},
    {sentence:"ข้าม", action: 'skipGacha'}
]

var options = {
    shouldSort: true,
    tokenize: false,
    includeScore: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 64,
    minMatchCharLength: 1,
    keys: [
        "sentence"
    ]
};

var commandSearch = new (require('fuse.js'))(list, options); // "list" is the item array

const UserUI = styled.div`
    display : flex;
    justify-content : center;
    border : solid 2px black;
    border-radius : 10px;
` 

export default class Start extends Component{

    constructor(props){
        super(props)
        this.child = React.createRef()
        this.state = {
            money: 1000,
            token: 1000,
            command: "",
            collectPage: false,
            gachaList: [[1,1,1,1],
                        [1,1,1,1],
                        [1,1,1,0],
                        [0,0,1,0],
                        [0,0,0,0],
                        [0,0,0,0],
                        [0,0,0,0],
                        [1]]
        }
        this.handleCommand = this.handleCommand.bind(this)
        this.openCollection = this.openCollection.bind(this)
        this.closeCollection = this.closeCollection.bind(this)
        this.addMoney = this.addMoney.bind(this)
        this.addToken = this.addToken.bind(this)
        this.randomGachaWithNumber = this.randomGachaWithNumber.bind(this)
        this.cheatGacha = this.cheatGacha.bind(this)
        this.skipGacha = this.skipGacha.bind(this)
    }

    handleCommand(text){
        console.log("Searching "+text);
        let cmd = commandSearch.search(text)[0];
        if(cmd !== undefined) {
            console.log("I think it is ",cmd.item.sentence);
            if(cmd.score == 0) {
                console.log("I'm fucking sure");
            }
            else if(cmd.score <= 0.2) {
                console.log("I'm pretty sure");
            }
            else if(cmd.score <= 0.5) {
                console.log("I'm not quite sure");
            }
            else {
                console.log("I don't think it's correct ... I will ignore it");
                return;
            }
            if(cmd.item.action == 'skipGacha' || !this.child.current.state.play)
            {
                this.setState({command:cmd.item.action});
                this[cmd.item.action](cmd.item.params);
            }
        }
        else {
            console.log("I can't even find a good match");
            return;
        }
    }

    openCollection(){
        this.setState({collectPage: true})
    }

    closeCollection(){
        this.setState({collectPage: false})
    }

    addMoney(addedMoney){
        this.setState({money:this.state.money + addedMoney})
    }

    addToken(addedToken){
        this.setState({token:this.state.token + addedToken, money: this.state.money - exchangeRate[addedToken]})
    }

    randomGachaWithNumber(number){
        if(this.state.token - number * 3 < 0) {
            console.log("Not enough gem !!!");
            return;
        }
        
        var gachaRateList = [75,435,510,585,660,735,810,885,960,1035,1110,1185,1545,1620,1695,1770,1845,1920,1980,2040,2100,2160,2220,2280,2296,2332,2348,2384,2400];
        let resultList = [];
        for(let i = 0; i < number; i++) {
            var roll = Math.floor(Math.random()*2400);
            for(let j = 0; j < gachaRateList.length ; j++){
                if(gachaRateList[j] > roll){
                    let tmp = this.state.gachaList
                    tmp[parseInt(gachaResolve[j]/4)][parseInt(gachaResolve[j]%4)] = 1
                    this.setState({gachaList:tmp})
                    resultList.push(j);
                    break;
                }
            }
        }
        console.log(resultList);
        console.log(this.child.current);
        this.setState({token:this.state.token - number * 3})
        this.child.current.randomGacha(resultList)
    }

    randomGachaSpecific(card){
        if(this.state.token - 3 < 0) {
            console.log("Not enough gem !!!");
            return;
        }
            
        
        var atiwongCardList = [0,1,2,9,10,11,18,19,20,24,25,28];
        var atiwongRateList = [50,230,280,330,380,430,480,525,570,576,594,600];
        var ekapolCardList = [3,4,5,6,7,8,12,13,14,15,16,17,21,22,23,27,28];
        var ekapolRateList =  [50,100,150,200,250,300,630,680,730,780,830,880,935,990,1045,1078,1100];
        this.setState({token:this.state.token - 3})
        if(card == "atiwong") {
            this.setState({token:this.state.token - 3})
            var roll = Math.floor(Math.random()*600);
            for(var i=0; i<atiwongRateList.length; i++){
                if(atiwongRateList[i] > roll){
                    let tmp = this.state.gachaList
                    tmp[parseInt(atiwongCardList[i]/4)][parseInt(atiwongCardList[i]%4)] = 1
                    this.setState({gachaList:tmp})
                    this.child.current.randomGacha([atiwongCardList[i]]);
                    break;
                }
            }
        }
        else if(card == "ekapol"){
            this.setState({token:this.state.token - 3})
            var roll  = Math.floor(Math.random()*1100);
            for(var i=0; i<ekapolRateList.length; i++){
                if(ekapolRateList[i] > roll){
                    let tmp = this.state.gachaList
                    tmp[parseInt(ekapolCardList[i]/4)][parseInt(ekapolCardList[i]%4)] = 1
                    this.setState({gachaList:tmp})
                    this.child.current.randomGacha([ekapolCardList[i]]);
                    break;
                }
            }
        }
    }

    cheatProfessor(name){
        if(name === "ekapol"){
            const ekapol_list = [3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 17, 21, 22, 23]
            for(let i in ekapol_list){
                console.log(i)
                let tmp = this.state.gachaList
                tmp[parseInt(ekapol_list[i]/4)][parseInt(ekapol_list[i]%4)] = 1
                this.setState({gachaList:tmp})
    
            }
        }else if(name === "atiwong"){
            const atiwong_list = [0, 1, 2, 9, 10, 11, 18, 19, 20, 24, 25]
            for(let i in atiwong_list){
                let tmp = this.state.gachaList
                tmp[parseInt(atiwong_list[i]/4)][parseInt(atiwong_list[i]%4)] = 1
                this.setState({gachaList:tmp})

            }
        }else if(name === "athasit"){
            let tmp = this.state.gachaList
            tmp[26/4][26%4] = 1
            this.setState({gachaList:tmp})

        }
    }

    skipGacha(){
        this.child.current.setState({
            play : false,
            vid: false,
            flip: false,
            crop : false,
            scale: false,
            gachalist : [],
            gachalength : 0
        })
    }

    cheatGacha(){
        this.setState({gachaList:  [[1,1,1,1],
                                    [1,1,1,1],
                                    [1,1,1,1],
                                    [1,1,1,1],
                                    [1,1,1,1],
                                    [1,1,1,1],
                                    [1,1,1,1],
                                    [1]]})
    }


    render(){
        return(
            <div class="container">
                <div>
                    {/*<button onClick={()=>{this.randomGachaWithNumber(2)}}>AAAAAA</button>*/}
                    <div>
                        <Microphone worker={myWorker} handleCommand={this.handleCommand} />
                    </div>
                    <UserUI>
                        <Token token={this.state.token}/><div style={{width:"200px"}}/><Money money={this.state.money}/>
                    </UserUI>
                </div>
                <br />
                {
                    this.state.collectPage == true ?
                    
                    <div style={{display:"flex"}} >
                        <Collection gachaList={this.state.gachaList}/>
                    </div> :
                    <div style={{position: 'static'}}>
                        <Video ref={this.child}/>
                    </div>
                }
                
                       
            </div>
        )
    }
    
    
}
