import React, { Component } from 'react';
import {Col, Row} from 'react-bootstrap'

export default class Collection extends Component {
    constructor(props){
        super(props)
        this.state = {
            Collection: [[0,0,0,1],
                        [0,1,1,1],
                        [0,1,1,0],
                        [0,0,0,0],
                        [1,0,0,1]]
        }
    }

    render(){
        return(
            <div>
                {this.state.Collection.map((item, index) => (
                    <Row>
                        {item.map((item, index) =>(
                            <Col xs={2}>
                                {item === 1? <img src="./img/mashiro.jpg" width="200px"/>:<img src="./img/questionMask.png" width="200px"/>}
                            </Col>
                        ))}
                    </Row>
                ))}
            </div>
        )
    }
}