import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

import LyricsView from './lyricsView';


export default class SearchLyrics extends Component {
    constructor() {
        super();
        this.state = { 
            artist: '', 
            title: '', 
            message: '', 
            lyrics: null,
            isLoading: false, 
            showLyrics: false
        };
        this.inputArtistRef = React.createRef();
    }

    componentDidMount() {
        this.inputArtistRef.current.focus();
    }

    handleInput(artist, title) {
        this.setState({ message: "", showLyrics: false });

        (artist !== '' && title !== '') ? (
            this.searchLyrics()
        ):
        this.setState({ message: "Artist and title have to be specified"})
    }

    async searchLyrics() {
        this.setState({ isLoading: true });

        await fetch('https://localhost:44307/api/Lyrics/Search', {
          method: 'POST',
          body: JSON.stringify({
            artist: this.state.artist,
            title: this.state.title,
          }),
          headers: { 'Content-Type': 'application/json; charset=UTF-8'}
        })
        .then(async response => {
            const data = await response.json();
      
            if(!response.ok) {
              const error = (data && data.message) || response.status;
              this.setState({ message: "No lyrics found", isLoading: false });
              return Promise.reject(error);              
            }

            this.setState({ lyrics: data, showLyrics: true, isLoading: false });
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('Error: ', error);
        })
    }

    handleClose() {
        this.setState({ showLyrics: false, });
    }

    render() {
        const { artist, title, message, lyrics, isLoading, showLyrics } = this.state

        if(showLyrics === true) {
            return (
                <LyricsView user={this.props.user} lyrics={lyrics} onClose={() => this.handleClose()}/>
            )
        }
        else {
            return (
                <>
                <Container>
                <Form className='mt-5'>
                    <h4>Search for lyrics:</h4>
                    <Form.Row className='mt-4 mb-4'>
                        <Col>       
                            <Form.Control
                                ref={this.inputArtistRef}
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
                            <Button variant='info' block onClick={
                                () => this.handleInput( artist, title )}>Search</Button>
                        </Col>            
                    </Form.Row>
                </Form>                              
                </Container>
                <div className="center-item">
                    <p>{message}</p>
                    {isLoading === true ? (
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    ): null }
                </div>
                </>
            )
        }
    }
}