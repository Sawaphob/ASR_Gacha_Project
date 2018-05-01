import React, { Component } from 'react'
import Money from '../component/Money'
import Token from '../component/Token'
import Collection from '../component/Collection'
import Video from '../component/Video'
import Microphone from '../component/Microphone'
import {Col,Row} from 'react-bootstrap'
import myWorker from "../lib/recorderWorker.js"
//let myWorker = require("../lib/recorderWorker.js");

const gachaResolve = {
    "0" : "atiwaong_asr.jpg",
    "1" : "atiwong1_n.jpg",
    "2" : "atiwong1_r.jpg",
    "3" : "atiwong1_sr.jpg",
    "4" : "atiwong2_asr.jpg",
    "5" : "atiwong2_n.jpg",
    "6" : "atiwong2_r.jpg",
    "7" : "atiwong2_sr.jpg",
    "8" : "atiwong3_n.jpg",
    "9" : "atiwong3_r.jpg",
    "10" : "atiwong3_sr.jpg",
    "11" : "atthasit_asr.jpg",
    "12" : "ekapol_asr.jpg",
    "13" : "ekapol1_n.jpg",
    "14" : "ekapol1_r.jpg",
    "15" : "ekapol1_sr.jpg",
    "16" : "ekapol2_n.jpg",
    "17" : "ekapol2_r.jpg",
    "18" : "ekapol2_sr.jpg",
    "19" : "ekapol3_n.jpg",
    "20" : "ekapol3_r.jpg",
    "21" : "ekapol3_sr.JPG",
    "22" : "ekapol4_n.jpg",
    "23" : "ekapol4_r.jpg",
    "24" : "ekapol5_n.jpg",
    "25" : "ekapol5_r.jpg",
    "26" : "ekapol6_n.jpg",
    "27" : "ekapol6_r.jpg",
    "28" : "ekapolAndatiwong_asr.jpg"
}

export default class Start extends Component{

    constructor(props){
        super(props)
        this.state = {
            money:1000,
            token:1000,
            gacha: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        }
    }

    render(){
        return(
            <div class="container">
                <div>
                <Row>
                    <Microphone worker={myWorker} />
                </Row>
                <Row>
                    <Col xs={1}>
                        <Token />
                    </Col>
                    <Col xs={1}>
                        <Money />
                    </Col>
                </Row>
                </div>
                 <div style={{position: 'static'}}>
                    <Video/>
                </div>
                <div style={{display:"flex"}}>
                    <Collection />
                       
                </div>        
            </div>
        )
    }
    
    
}