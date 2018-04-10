import React, { Component } from 'react';

export default class Token extends Component {
    constructor(props){
        super(props)
        this.state = {
            token: 10
        }
    }

    render(){
        return(
            <div>
                เพชรจ้าาาาาา {this.state.token}
            </div>
        )
    }
}