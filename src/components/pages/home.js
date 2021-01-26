import React, { Component } from 'react';

import SearchLyrics from '../pages/lyrics/searchLyrics';

export default class Home extends Component {

    render() {
        if(this.props.user !== null) {
            return (
                <p></p>
            )
        }
        else {
            return (
                <SearchLyrics />
            )
        }
    }
}