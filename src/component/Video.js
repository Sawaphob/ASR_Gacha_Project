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
const Cropimg = keyframes`

      to{
        height:0px;
      }
`
const Scale = keyframes`
      0%{
          transform: scale(1,1);
      }
      50%{
          transform: scale(1.2,1.2);
      }
      100%{
          transform: scale(1,1);
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
    height: 720px;
    z-index: 4;
    visibility: ${props => props.visibility};
`;

const Fadeimg = styled.img`
    position: absolute;
    height: 720px;
    z-index: 3;
    opacity:0;
    animation: ${Fade} 2s ease-in 4s 1;
`;

const Gachaimg = styled.img`
    height: 720px;
    position: absolute;
    z-index: -1;
`;

const Cardimg = styled.img`
    position: static;
    height: 520px;
    width: 370px;
    display: block;
    z-index: 2;
    transform-style: preserve-3d;
    perspective: 800px;
    animation-fill-mode: forwards;
    visibility: ${props => props.visibility};
    ${
        (props) =>{
            if(props.flip){
                return `animation: ${Flip} 1.25s linear 2;`
            }else{
                return `animation: ${Scale} 1.5s 2s;`
            }
        }
        }
`;

const Crop = styled.div`
    position: absolute;
    top:194px;
    left:auto;
    height: 520px;
    width: 370px;
    z-index: 2;
    margin:auto;
    overflow: hidden;
    animation: ${Cropimg} 2s linear 7s;
    animation-fill-mode: forwards;
`;

//${Flip} 1.25s linear 4.5s 2
//${Scale} 2s

export default class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            vid: true,
            flip: false,
            play : false
        };
    }

    gacha() {
        this.setState({ vid: !this.state.vid });
        this.setState({ flip: !this.state.flip });
    }

    start(){
        this.setState({ play: !this.state.play });
    }

    startscale(){
        console.log("start scale")
        if(this.state.flip){
            this.setState({ flip: !this.state.flip });
        }
        
    }

    render() {
        if (!this.state.play){
            return(
                <button onClick={this.start.bind(this)}> click me! </button>
            )
        }else{
            return (
            
                <Viddiv>
                    <Gachavid autoPlay muted onEnded={this.gacha.bind(this)} visibility={this.state.vid ? 'visible' : 'hidden'}>
                        <source src="./video/rainbow.mp4" type="video/mp4" />
                    </Gachavid>
                    <Fadeimg src="./img/gacha_fade.png" />
                    <Gachaimg src="./img/gacha.png" />
                    <Cardimg src="./img/ekapol1_n.jpg" flip={this.state.flip} visibility={this.state.vid ? 'hidden' : 'visible'}/>
                    <Crop onAnimationEnd={this.startscale.bind(this)}>
                        <Cardimg src="./img/cardback.jpg"  flip={this.state.flip} visibility={this.state.vid ? 'hidden': 'visible'}/>
                    </Crop>
                </Viddiv>
            )
        }
    }
}