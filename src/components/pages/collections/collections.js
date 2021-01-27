import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

import PopUpButton from './popUpButton';

export default class Collections extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            collections: this.props.user.collections,
            collectionWithLyrics: [], 
            collectionId: '', 
            showCollectionLyrics: false,
        }
    }

    componentDidUpdate(prevProp) {
        if (this.props.user.collections !== prevProp.user.collections) {
            this.setState({ collections: this.props.user.collections })
        }
    }



    render() {
        return (
            <div className="collections">
                <Container>
                    <PopUpButton />
                    <ListGroup className="mt-4">
                        {this.state.collections.map((item) => (
                            <ListGroup.Item as="a" key={item.id} variant="danger" onClick={() => this.handleListClickEvent(item.id)}>
                            {(item.name)}
                            </ListGroup.Item>
                        ))}    
                    </ListGroup>
                </Container>                
            </div>
        )
    }
}