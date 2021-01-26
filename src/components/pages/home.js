import React, { Component } from 'react';

export default class Home extends Component {
    

    render() {
        if(this.props.user !== null) {
            return (
                <p>Signed in as: {this.props.user.name}</p>
            )
        }
        else {
            return (
                <div>inte inloggad</div>
            )
        }
    }
}