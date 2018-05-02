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
            }else if (props.scale){
                return `animation: ${Scale} 1s 1s;`
            }else{
                return null;
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

export default class Video extends Component {
    constructor(props) {
        super(props)
        this.state = {
            play : false,
            vid: false,
            flip: false,
            crop : false,
            scale: false
        };
        this.vidref = null;

        this.startvid = element => {
          this.vidref = element;
        };

        this.randomGacha = this.randomGacha.bind(this)
    }

    start(){
        this.setState({ play: !this.state.play });
        this.setState({ vid: !this.state.vid });
        if (this.vidref) this.vidref.play();
    }

    videoend() {
        this.setState({ vid: !this.state.vid });
        this.setState({ flip: !this.state.flip });
    }

    startscale(){
        if(this.state.flip && !this.state.crop && !this.state.scale){
            this.setState({ flip: !this.state.flip });
            this.setState({ crop: !this.state.crop });
        }else if (!this.state.flip && this.state.crop && !this.state.scale){
            this.setState({ crop: !this.state.crop });
            this.setState({ scale: !this.state.scale });
        }
        else if (!this.state.flip && !this.state.crop && this.state.scale){
            console.log("set time out")
            setTimeout(() => {
                this.setState({ scale: !this.state.scale });
                this.setState({ play: !this.state.play });
            }, 2000);
            
        }
        
    }

    randomGacha(i){
        console.log(i)
    }



    render() {
        if (!this.state.play){
            return(
                <div>
                    <button onClick={this.start.bind(this)}> click me! </button>
                <Viddiv>
                    <Gachaimg src="./img/banner.png"/>
                </Viddiv>
                </div>
            )
        }else{
            return (
            
                <Viddiv>
                    <Gachavid autoPlay muted onEnded={this.videoend.bind(this)} visibility={this.state.vid ? 'visible' : 'hidden'} ref={this.startvid}>
                        <source src="./video/rainbow.mp4" type="video/mp4" />
                    </Gachavid>
                    <Fadeimg src="./img/gacha_fade.png" />
                    <Gachaimg src="./img/gacha.png" />
                    <Cardimg src="./img/ekapol1_n.jpg" flip={this.state.flip} scale={this.state.scale} visibility={this.state.vid ? 'hidden' : 'visible'}/>
                    <Crop onAnimationEnd={this.startscale.bind(this)}>
                        <Cardimg src="./img/cardback.jpg"  flip={this.state.flip} scale={this.state.scale} visibility={this.state.vid ? 'hidden': 'visible'}/>
                    </Crop>
                </Viddiv>
            )
        }
    }
}