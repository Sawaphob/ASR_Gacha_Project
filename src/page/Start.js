import React, { Component } from 'react'
import Money from '../component/Money'
import Token from '../component/Token'
import Collection from '../component/Collection'
import {Col,Row} from 'react-bootstrap'

export default class Start extends Component{
    render(){
        return(
            <div>
                <Row>
                    <Col xs={1}>
                        <Token />
                    </Col>
                    <Col xs={1}>
                        <Money />
                    </Col>
                </Row>
                <Row>
                    <Collection />
                </Row>
            </div>
        )
    }
}