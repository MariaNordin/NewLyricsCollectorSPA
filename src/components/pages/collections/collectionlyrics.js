import React, { Component } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export default class CollectionLyrics extends Component {
    constructor() {
        super();
        this.state = { title: '', artist: '', lyrics: '' }
    }
    componentDidMount() {
        const thisLyrics = this.props.lyrics.find((item) => 
            item.lyricsId === this.props.lyricsId );

        this.setState({ 
            title: thisLyrics.lyrics.title,
            artist: thisLyrics.lyrics.artist,
            lyrics: thisLyrics.lyrics.songLyrics });
    }

    handleClose() {
        this.props.onClose();
    }

    render() {
        return (
            <Container>
                <Card className="m-5">
                    <Card.Body className="mt-3 ml-5 mr-5 mb-3">
                        <Card.Title className="ml-3">{this.state.title}</Card.Title>
                        <Card.Subtitle className="mb-3 ml-3 mt-1">{this.state.artist}                       
                        </Card.Subtitle>                      
                        <Card.Text className="ml-3 mr-3">{this.state.lyrics}</Card.Text>                       
                        <Button className="ml-3 mt-3 pl-4 pr-4" 
                            variant="secondary" onClick={() => this.handleClose()}>Close
                        </Button>
                    </Card.Body>
                </Card>    
            </Container>                       
        )
    }
}