import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

export default class SaveLyrics extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            collections: this.props.user.collections, 
            collectionId: '',
        }
    }

    // async componentDidMount() {
    //     let token = sessionStorage.getItem('token');

    //     await fetch('https://localhost:44307/api/Collection/AllCollections', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json; charset=UTF-8',
    //             'Authorization': 'Bearer ' + token
    //         }
    //     })
    //     .then(async response => {
    //         const data = await response.json();
        
    //         if(!response.ok) {
    //             const error = (data && data.message) || response.status;
    //             return Promise.reject(error);
    //         }
        
    //         console.log(data);
    //         this.setState({ collections: data });
    //     })
    //     .catch(error => {
    //         this.setState({ errorMessage: error.toString() });
    //         console.error('Error: ', error);
    //     })
    // }

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
        this.props.onSaved();
    }

    render() {
        return (
            <div className="pop-up">
                <Container>
                    <ListGroup className="mt-3">
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