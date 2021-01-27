import React, { Component } from 'react';

import { Button, Form } from 'react-bootstrap';

export default class Login extends Component {
    constructor() {
        super();
        this.state = { title: '', message: '' }
    }

    handleInput() {
        (this.state.title !== '') ? (
          this.handleSave()
        ):
        this.setState({ message: "No name?" })
    }

    async handleSave() {
        let token = sessionStorage.getItem('token');

        await fetch('https://localhost:44307/api/Collection/NewCollection', {
            method: "POST",
            body: JSON.stringify ({
                newName: this.state.title,
          }),
          headers: { 
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': 'Bearer ' + token
            }
        })
        .then((response) => response.json())
        .then((json) => this.setState({ message: json.message }))
        .catch (
            err => {
                console.log(err);
            }
        )
    }

    render() {
        return (
            <div className="pop-up">
                <p>Give your new collection a name!</p>
                <Form className='mt-4 mb-4'>
                <Form.Row className='mt-4'>
                    <Form.Control 
                        type='input'
                        placeholder='Collection Name'
                        value={this.state.title}
                        onChange={(e) => this.setState({ title: e.target.value })}
                    >
                    </Form.Control>
                </Form.Row>
                </Form>                
                <Button className="pl-4 pr-4" variant="success" onClick={() => this.handleInput()}>Save</Button>
            </div>            
        )
    }
}