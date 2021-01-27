import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

export default class Collections extends Component {
    constructor() {
        super();
        this.state = { collection: [{}] }
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
        
            this.setState({ collection: data[0] });
            console.log(data);
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('Error: ', error);
        })        
    }

    // {this.state.collection.lyrics.map((item) => (
    //     <ListGroup.Item as="a" key={item.id} variant="danger">
    //         {(item.lyrics.title)}
    //     </ListGroup.Item>
    // ))} 
    

    onGoBackClick() {
        this.props.onBackClick();
    }

    render() {
        return(
            <div>
                <Container>
                    <h1 className="mt-3" >{this.state.collection.name}</h1>        
                    <ListGroup className="mt-4">
   
                    </ListGroup>
                    <Button className="mt-5" variant="info" onClick={() => this.onGoBackClick()}>Back to all collections</Button>
                </Container>                
            </div>
        )
    }
}