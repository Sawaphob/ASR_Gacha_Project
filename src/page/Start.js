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


var list = [
    {sentence:"เปิด หนึ่ง", action: 'randomGacha', params: 1},
    {sentence:"เปิด สิบ", action: 'randomGacha', params: 10},
    {sentence:"เปิด เอา อาจารย์ เอกพล", action: 'randomGacha?', params: 1},
    {sentence:"เปิด เอา อาจารย์ อรรถสิทธิ์", action: 'randomGacha?', params: 1},
    {sentence:"เปิด เอา อาจารย์ อติวงศ์", action: 'randomGacha?', params: 1},
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
    {sentence:"โกง เอา เอ เอส อา", action: 'cheatRarity', params: 'ASR'}
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
            collectPage: true,
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
        this.randomGacha = this.randomGacha.bind(this)
        this.cheatGacha = this.cheatGacha.bind(this)
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
            this.setState({command:cmd.item.action});
            this[cmd.item.action](cmd.item.params);
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
        this.setState({token:this.state.token + addedToken})
    }

    randomGacha(){
        this.child.current.start()
    }

    cheatProfessor(name){
        if(name === "ekapol"){
            const ekapol_list = [3, 4, 5, 6, 7, 8, 12, 13, 14, 15, 16, 17, 21, 22, 23]
            for(var i in ekapol_list){
                console.log(i)
                let tmp = this.state.gachaList
                tmp[parseInt(ekapol_list[i]/4)][parseInt(ekapol_list[i]%4)] = 1
                this.setState({gachaList:tmp})
    
            }
        }else if(name === "atiwong"){
            const atiwong_list = [0, 1, 2, 9, 10, 11, 18, 19, 20, 24, 25]
            for(var i in atiwong_list){
                let tmp = this.state.gachaList
                tmp[parseInt(atiwong_list[i]/4)][parseInt(atiwong_list[i]%4)] = 1
                this.setState({gachaList:tmp})

            }
        }else if(name === "atthasit"){
            let tmp = this.state.gachaList
            tmp[26/4][26%4] = 1
            this.setState({gachaList:tmp})

        }
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
                    {/* <button onClick={()=>{this.cheatProfessor("atiwong")}}>AAAAAA</button> */}
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