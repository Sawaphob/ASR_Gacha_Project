import React, { Component } from 'react';

export default class Token extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                {this.props.token} <img src="./saintquartz.png" width="40px"/>
            </div>
        )
    }
}