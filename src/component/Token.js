import React, { Component } from 'react';

export default class Token extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                เพชรจ้าาาาาา {this.props.token}
            </div>
        )
    }
}