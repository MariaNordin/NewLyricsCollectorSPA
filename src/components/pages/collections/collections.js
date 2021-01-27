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

    async updateCollections() {
        let token = sessionStorage.getItem('token');

        await fetch('https://localhost:44307/api/Collection/AllCollections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(async response => {
            const data = await response.json();
        
            if(!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
        
            console.log(data);
            this.setState({ collections: data });
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('Error: ', error);
        })
    }
    


    render() {
        return (
            <div className="collections">
                <Container>
                    <PopUpButton onSavedCollection={() => this.updateCollections()}/>
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