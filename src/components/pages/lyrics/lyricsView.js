import React, { Component } from 'react';
import { Container, Card, Button, Image } from 'react-bootstrap';

import SaveButton from '../collections/saveButton';

export default class LyricsView extends Component {

    handleClose() {
        this.props.onClose();
    }

    render() {
        let buttons;

        if(this.props.user !== null) {
            buttons = (
                <>
                <SaveButton />
                <Button className="ml-3 mt-3 pl-4 pr-4" 
                    variant="outline-secondary" onClick={() => this.handleClose()}>Close
                </Button>
                </>
            )
        }
        else {
            buttons = (
                <Button className="ml-3 mt-3 pl-4 pr-4" 
                    variant="outline-secondary" onClick={() => this.handleClose()}>Close
                </Button>
            )
        }

        return (
            <Container>
                <Card className="m-5">
                    <Card.Body className="mt-3 ml-5 mr-5 mb-3">
                        <Card.Title className="ml-3">
                            {this.props.lyrics.title}
                            <div className="cover">
                                <Image className="mr-3" src={this.props.lyrics.coverImage} alt="albumCover" fluid/>
                            </div>
                        </Card.Title>
                        <Card.Subtitle className="mb-3 ml-3 mt-1">{this.props.lyrics.artist}             
                        <a id="spotify" href={this.props.lyrics.spotifyLink} target="_blank" rel="noreferrer">
                            Listen on Spotify
                        </a>                                               
                        </Card.Subtitle>                      
                        <Card.Text className="ml-3 mr-3">{this.props.lyrics.lyrics}</Card.Text>                       
                        {buttons}
                    </Card.Body>
                </Card>    
            </Container>                       
        )
    }
}