import React, { Component } from 'react';
import Popup from  'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from 'react-bootstrap/Button';

import NewCollection from './newCollection';

export default class PopUpButton extends Component {
    render() {
        const Modal = () => (
            <Popup trigger={<Button variant="outline-info">New Collection</Button>} modal>
                <NewCollection />
            </Popup>
        );
        return (
                <Modal />            
        );
    }
}