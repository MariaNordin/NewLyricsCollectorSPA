import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

//import './../../globalCss.css';
//import LyricsView from '../lyricsView/lyricsView';

export default class SearchLyrics extends Component {
    constructor() {
        super();
        this.state = { 
            artist: '', 
            title: '', 
            message: '', 
            lyrics: null, 
            showLyrics: false, 
            isLoggedIn: false
        };
    }

    handleInput(artist, title) {
        this.setState({ message: "", showLyrics: false });

        (artist !== '' && title !== '') ? (
          this.searchLyrics()
        ):
        this.setState({ message: "Artist and title have to be specified"})
    }

    async searchLyrics() {
        await fetch('https://localhost:44307/api/Lyrics/Search', {
          method: 'POST',
          body: JSON.stringify({
            artist: this.state.artist,
            title: this.state.title,
          }),
          headers: { 'Content-Type': 'application/json; charset=UTF-8'}
        })
        .then((response) => response.json())
        .then((json) => this.setState({ lyrics: json }));

        this.checkLyrics();
    }

    checkLyrics() {
        (this.state.lyrics.lyrics === "") ? (
            this.setState({ message: "No lyrics found" })
        ) : this.setState({ showLyrics: true });
    }

    render() {
        const { artist, title } = this.state
        return(
            <Container>
            <Form className='mt-5'>Search for lyrics:
                <Form.Row  className='mt-4'>
                    <Col>       
                        <Form.Control 
                            type='input' 
                            value={artist} 
                            placeholder='Artist' 
                            onChange={(e) => this.setState({ artist: e.target.value })}
                        />
                    </Col>
                    <Col>
                        <Form.Control 
                            type='input' 
                            value={title}
                            placeholder='Song Title'
                            onChange={(e) => this.setState({ title: e.target.value })} 
                        />                  
                    </Col>
                    <Col>
                        <Button variant='primary' block onClick={
                            () => this.handleInput( artist, title )}>Search</Button>
                    </Col>            
                </Form.Row>
            </Form>
            </Container>
        )
    }
}