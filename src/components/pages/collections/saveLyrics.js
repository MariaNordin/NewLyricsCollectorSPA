import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

export default class SaveLyrics extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            collections: this.props.user.collections, 
            collectionId: '',
            isSaved: false
        }
    }

    async handleSave(id) {
        let token = sessionStorage.getItem('token');

        await fetch('https://localhost:44307/api/Collection/Save', {
            method: "POST",
            body: JSON.stringify ({
                id: id,
          }),
          headers: { 
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((json) => 
            this.setState({ message: json.message }))
        .catch (
            err => {
                console.log(err);
            }
        )
        this.handleSaved();
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