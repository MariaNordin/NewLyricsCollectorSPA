import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';

import CollectionLyrics from './collectionlyrics';

export default class Collections extends Component {
    constructor() {
        super();
        this.state = { collection: [], name: '', lyrics: [], lyricsId: '', showLyrics: false }
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
        
            this.setState({ collection: data, name: data.name, lyrics: data.lyrics });
            console.log(this.state.collection, this.state.lyrics);
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('Error: ', error);
        })        
    }

    handleLyricsClick(id) {
        this.setState({ lyricsId: id, showLyrics: true });
    }

    handleCloseLyrics() {
        this.setState({ showLyrics: false })
    }

    onGoBackClick() {
        this.props.onBackClick();
    }

    render() {

        if (this.state.showLyrics === true) {
            return (
                <CollectionLyrics
                    lyrics={this.state.lyrics}
                    lyricsId={this.state.lyricsId}
                    onClose={() => this.handleCloseLyrics()} 
                />
            )
        }
        else {
            return (
                <div className="collections">
                    <Container>
                        <h2 className="mt-3">{this.state.name}</h2>
                        <ListGroup className="mt-4">
                        {this.state.lyrics.map((item) => (
                            <div key={item.lyricsId}>
                            <ListGroup.Item action key={item.lyrics.id} variant="danger" onClick={() => this.handleLyricsClick(item.lyrics.id)}>
                                    <Image className="mr-3 cover-list-item" src={item.lyrics.coverImage} alt="albumCover"/>
                                    {item.lyrics.title} - {item.lyrics.artist}                                                                                                                    
                            </ListGroup.Item>
                            </div>                        
                        ))}
                        </ListGroup>                    
                        <Button className="mt-4" variant="info" 
                            onClick={() => this.onGoBackClick()}>Go back</Button>
                    </Container>                
                </div>
            )
        }        
    }
}