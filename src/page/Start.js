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
            <div>
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
                <div style={{position: 'static'}}>
                    <Row>
                        <Collection />
                    </Row>
                </div>        
            </div>
        )
    }
}