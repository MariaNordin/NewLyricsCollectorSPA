import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export default class Collections extends Component {
    constructor() {
        super();
        this.state = { collection: [{}], name: '', lyrics: [] }
    }

    async componentDidMount() {
        let token = sessionStorage.getItem('token');

        await fetch('https://localhost:44307/api/Collection/Collection', {
            method: 'POST',
            body: JSON.stringify ({
                id: this.props.collectionId,
            }),
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
        
            this.setState({ collection: data, name: data[0].name, lyrics: data[0].lyrics });
            console.log(this.state.collection, this.state.lyrics);
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('Error: ', error);
        })        
    }

    onGoBackClick() {
        this.props.onBackClick();
    }

    render() {
        return(
            <div>
                <Container>
                    <h1 className="mt-3">{this.state.name}</h1>
                    <ListGroup className="mt-4">
                    {this.state.lyrics.map((item) => (
                        <div key={item.lyricsId}>
                        <ListGroup.Item as="a" key={item.lyrics.id} variant="danger">
                            {item.lyrics.title}
                        </ListGroup.Item>
                        </div>                        
                    ))}
                    </ListGroup>                    
                    <Button className="mt-5" variant="info" onClick={() => this.onGoBackClick()}>Back to all collections</Button>
                </Container>                
            </div>
        )
    }
}