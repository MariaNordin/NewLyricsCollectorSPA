import React, { Component } from 'react';

import { Button, Form } from 'react-bootstrap';

export default class Login extends Component {
    constructor() {
        super();
        this.state = { title: '' }
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
                <Button className="pl-4 pr-4" variant="success">Save</Button>
            </div>            
        )
    }
}