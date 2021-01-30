import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

import PopUpButton from './popUpButton';
import ThisCollection from './thisCollection';

export default class Collections extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            collections: this.props.user.collections, 
            collectionId: '',
            showThisCollection: false,
        }
    }

    componentDidMount() {
        this.updateCollections();
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

    handleListClickEvent(id) {
        this.setState({ collectionId: id, showThisCollection: true });        
    }

    handleClose() {
        this.setState({ showThisCollection: false });
    }

    render() {
        if(this.state.showThisCollection === true) {
            return (
                <ThisCollection 
                    collectionId={this.state.collectionId}
                    onBackClick={() => this.handleClose()}
                />
            )
        }
        return (
            <div className="collections">
                <Container>
                    <h1 className="mb-4" >My Collections</h1>
                    <PopUpButton onSavedCollection={() => this.updateCollections()}/>
                    <ListGroup className="mt-3">
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