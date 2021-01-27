import React, { Component } from 'react';
import Popup from  'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from 'react-bootstrap/Button';

import SaveLyrics from './saveLyrics';

export default class SaveButton extends Component {
    onSavedLyrics() {
        this.props.onSavedCallback();
    }

    render() {
        const Modal = () => (
            <Popup trigger={<Button className="ml-3 mt-3 pl-4 pr-4" variant="info">Save</Button>} modal>
                <SaveLyrics user={this.props.user} onSaved={() => this.onSavedLyrics()}/>
            </Popup>
        );
        return (
                <Modal />            
        );
    }
}