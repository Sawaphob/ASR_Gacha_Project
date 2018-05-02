import React, { Component } from 'react'
import Money from '../component/Money'
import Token from '../component/Token'
import Collection from '../component/Collection'
import Video from '../component/Video'
import Microphone from '../component/Microphone'
import {Col,Row} from 'react-bootstrap'
import myWorker from "../lib/recorderWorker.js"
//let myWorker = require("../lib/recorderWorker.js");
import gachaResolve from '../data/gachaResolve.json'

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
        this.randomGacha = this.randomGacha.bind(this)
    }

    handleCommand(text){
        this.setState({command:text})
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
        this.child.current.randomGacha([1,2])
    }



    render(){
        return(
            <div class="container">
                <div>
                    {/* <button onClick={this.test}>AAAAAA</button> */}
                    <div>
                        <Microphone worker={myWorker} handleCommand={this.handleCommand} />
                    </div>
                    <div style={{display:"flex", align:"center"}}>
                        <Token token={this.state.token}/>
                        <Money money={this.state.money}/>
                    </div>
                </div>
                 <div style={{position: 'static'}}>
                    <Video ref={this.child}/>
                </div>
                <div style={{display:"flex"}} >
                    <Collection gachaList={this.state.gachaList}/>
                       
                </div>        
            </div>
        )
    }
    
    
}