import React, { Component } from 'react'
import Money from '../component/Money'
import Token from '../component/Token'
import Collection from '../component/Collection'
import Video from '../component/Video'
import Microphone from '../component/Microphone'
import {Col,Row} from 'react-bootstrap'
import myWorker from "../lib/recorderWorker.js"
//let myWorker = require("../lib/recorderWorker.js");

export default class Start extends Component{

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
<<<<<<< HEAD
                <div style={{position: 'static'}}>
                    <Video/>
                </div>
                <br />
                <br />
=======
                 <div style={{position: 'static'}}>
                    <Video/>
                </div>
>>>>>>> 485e3e7579195f90a557faee30b4a6600ff7bf03
                <div style={{display:"flex"}}>
                    <Collection />
                       
                </div>        
            </div>
        )
    }
    
    
}