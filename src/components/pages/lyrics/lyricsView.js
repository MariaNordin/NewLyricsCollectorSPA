import React, { Component } from 'react';
import { Container, Card, Button } from 'react-bootstrap';

export default class LyricsView extends Component {

    handleClose() {
        this.props.onClose();
    }

    render() {
        return (
            <Container>
                <Card className="m-5">
                    <Card.Body className="mt-3 ml-5 mr-5 mb-3">
                        <Card.Title className="ml-3">{this.props.lyrics.title}</Card.Title>
                        <Card.Subtitle className="mb-3 ml-3 mt-1">{this.props.lyrics.artist}
                        <a id="spotify" href={this.props.lyrics.spotifyLink} target="_blank" rel="noreferrer">
                            Listen on Spotify
                        </a>
                        </Card.Subtitle>                      
                        <Card.Text className="ml-3 mr-3">{this.props.lyrics.lyrics}</Card.Text>                       
                        <Button className="ml-3 mt-3 pl-4 pr-4" variant="secondary" onClick={() => this.handleClose()}>Close</Button>
                    </Card.Body>
                </Card>    
            </Container>                       
        )
    }
}