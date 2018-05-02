import React, { Component } from 'react';

export default class Money extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            money: 10
        }
    }

    render(){
        return(
            <div>
                {this.props.money}  <img src="./banknotes.png" width="40px"/>
            </div>
        )
    }
}