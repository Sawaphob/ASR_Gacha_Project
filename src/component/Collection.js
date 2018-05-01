import React, { Component } from 'react'
import { Col, Row} from 'react-bootstrap'
import styled from 'styled-components'

const CollectionBox = styled.div`
    height : 80vh;
    width : 100wh;
    margin-left : auto ;
    margin-right : auto ;
    text-align : center;
    overflow-y : scrool; 
    
`

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
            <CollectionBox>
                {this.state.Collection.map((item, index) => (
                    <Row>
                        {item.map((item, index) =>(
                            <Col xs={2} style={{width:"300px"}}>
                                {item == 1? <img src="./img/mashiro.jpg" width="300px"/>:<img src="./img/questionMask.png" width="300px"/>}
                            </Col>
                        ))}
                    </Row>
                ))}
            </CollectionBox>
        )
    }
}