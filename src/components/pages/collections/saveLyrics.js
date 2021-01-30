import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

export default class SaveLyrics extends Component {
    constructor() {
        super();
        this.state = { 
            collections: null, 
            collectionId: '',
            isLoaded: false,
            isSaved: false
        }
    }

    async componentDidMount() {
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
            this.setState({ collections: data, isLoaded: true });
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('Error: ', error);
        })
    }

    async handleSave(id) {
        let token = sessionStorage.getItem('token');

        await fetch('https://localhost:44307/api/Collection/SaveLyrics', {
            method: "POST",
            body: JSON.stringify ({
                id: id,
          }),
          headers: { 
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': 'Bearer ' + token
            }
        })
        .then(async response => {
            const data = await response.json();
        
            if(!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            
            this.handleSaved();
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('Error: ', error);
        })
    }

    handleSaved() {
        this.setState({ isSaved: true })       
    }

    render() {
        if (this.state.isSaved === true) {
            return (
                <Container>                    
                    <ListGroup className="mt-3 mb-3">
                        <ListGroup.Item variant="info">
                            Lyrics saved!
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            )
        }
        else if (this.state.isLoaded === false){
            return (
                <div>Loading</div>
            )
        }
        else {
            return (
                <div className="pop-up">
                    <Container>
                        Select collection:
                        <ListGroup className="mt-3 mb-3">
                            {this.state.collections.map((item) => (
                                <ListGroup.Item as="a" key={item.id} variant="danger" onClick={() => this.handleSave(item.id)}>
                                {(item.name)}
                                </ListGroup.Item>
                            ))}    
                        </ListGroup>
                    </Container>
                </div>            
            )
        }       
    }
}