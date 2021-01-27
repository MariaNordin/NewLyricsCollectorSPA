import React, { Component } from 'react';

import SearchLyrics from '../pages/lyrics/searchLyrics';
import Collections from './collections/collections';

export default class Home extends Component {

    render() {
        if(this.props.user !== null) {
            return (
                <Collections user={this.props.user}/>
            )
        }
        else {
            return (
                <SearchLyrics />
            )
        }
    }
}