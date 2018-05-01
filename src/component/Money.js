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
                เงินจ้าาาาาา {this.props.money}
            </div>
        )
    }
}