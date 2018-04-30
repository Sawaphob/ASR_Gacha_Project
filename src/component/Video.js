import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

const Fade = keyframes`
    from {
        opacity: 1;
      }
    
      to {
        opacity: 0;
      }
    `

const Flip = keyframes`
    from {
        transition: transform 1s;
        transform: rotateY(0deg);
      }
    
      to {
        transition: transform 1s;
        transform: rotateY(360deg);
      }
    `

const Viddiv = styled.div`
    position: static;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 720px;
`;

const Gachavid = styled.video`
    position: absolute;
    height: 100%;
    z-index: 4;
    visibility: ${props => props.visibility};
`;

const Fadeimg = styled.img`
    position: absolute;
    z-index: 3;
    opacity:0;
    animation: ${Fade} 2s ease-in 4s 1;
`;

const Gachaimg = styled.img`
    position: absolute;
    z-index: -1;
`;

const Cardimg = styled.img`
    position: absolute;
    height: 70%;
    display: block;
    z-index: 2;
    transform-style: preserve-3d;
    perspective: 800px;
    animation: ${Flip} 1.25s linear 4.5s 2;
    transform: ${props => props.transform};
`;

const Crop = styled.div`
      
`


export default class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vid: true,
            flip: false
        };
    }

    gacha() {
        this.setState({ vid: !this.state.vid });
        this.setState({ flip: !this.state.flip })
    }

    render() {
        return (
            <Viddiv>
                <Gachavid autoPlay muted onEnded={this.gacha.bind(this)} visibility={this.state.vid ? 'visible' : 'hidden'}>
                    <source src="./video/rainbow.mp4" type="video/mp4" />
                </Gachavid>
                <Fadeimg src="./img/gacha_fade.png" />
                <Gachaimg src="./img/gacha.png" />
                    <Cardimg src="./img/ekapol1_n.jpg" />
                    <Cardimg src="./img/cardback.jpg" />
            </Viddiv>
        )
    }
}