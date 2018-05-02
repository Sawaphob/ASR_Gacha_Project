import React, { Component } from 'react'
import { Col, Row} from 'react-bootstrap'
import styled from 'styled-components'

import gachaResolve from '../data/gachaResolve.json'

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
        }
    }

    render(){
        return(
            <CollectionBox>
                {this.props.gachaList.map((item1, index1) => (
                    <Row>
                        {item1.map((item2, index2) =>(
                            <Col sm={3}>
                                {item2 == 1? <img src={"./img/"+gachaResolve[index1*4+index2].filename} className="img-fluid"/>:<img src="./img/questionMask.png" className="img-fluid"/>}
                            </Col>
                        ))}
                    </Row>
                ))}
            </CollectionBox>
        )
    }
}