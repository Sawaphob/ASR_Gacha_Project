import React, { Component } from 'react'
import { Col, Row} from 'react-bootstrap'
import styled from 'styled-components'

const gachaResolve = {
    "0" : "atiwong_asr.jpg",
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
        console.log(this.props.gachaList)
        return(
            <CollectionBox>
                {this.props.gachaList.map((item1, index1) => (
                    <Row>
                        {item1.map((item2, index2) =>(
                            <Col sm={3}>
                                {item2 == 1? <img src={"./img/"+gachaResolve[index1*4+index2]} className="img-fluid"/>:<img src="./img/questionMask.png" className="img-fluid"/>}
                            </Col>
                        ))}
                    </Row>
                ))}
            </CollectionBox>
        )
    }
}