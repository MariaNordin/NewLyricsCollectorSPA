import React, { Component } from 'react';
import Popup from  'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from 'react-bootstrap/Button';

import NewCollection from './newCollection';

export default class PopUpButton extends Component {
    render() {
        const Modal = () => (
            <Popup trigger={<Button variant="outline-info" block>Add New Collection</Button>} modal>
                <NewCollection onSaved={this.props.onSavedCollection}/>
            </Popup>
        );
        return (
                <Modal />            
        );
    }
}