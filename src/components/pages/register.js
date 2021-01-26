import React, { Component } from 'react';
import { Container, Form, Button} from 'react-bootstrap';

import './forms.css';

export default class Register extends Component {
    constructor() {
        super();
        this.state = { 
            email: '', 
            password: '',
            name: '',
            message: ''
        }
    }

    handleSubmit() {
        this.setState({ message: '' });

        const emailRegex = /^\S+@\S+\.\S+$/;
    
        if (this.state.email === "" || this.state.password === "" || this.state.name === "" ) {
            this.setState({ message: "Can't register empty" });
        }
        else(
            (emailRegex.test(this.state.email)) ? (
                this.register()
            ):
            this.setState({ message: 'Not a valid email address.', email: '' })
        )
    }

    async register() {
        await fetch('https://localhost:44307/api/User/Register', {
          method: "POST",
          body: JSON.stringify ({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
          }),
          headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        .then((response) => response.json())
        .then((json) => this.setState({ message: json.message }))
        .catch (
            err => {
                console.log(err);
            }
        )
        this.checkMessage();
    }

    checkMessage() {
        if (this.state.message === "Registered!")
        this.setState({ showLoginLink: true })
    }


    render() {
        const { email, password, name, message } = this.state;
        return (
            <div className="formContainer">
                <Container>
                <Form className='mt-4 mb-4'>
                <Form.Row className='mt-4'>
                    <Form.Control 
                        type='input'
                        value={name}
                        placeholder='Username'
                        onChange={(e) => this.setState({ name: e.target.value })}
                    >
                    </Form.Control>
                </Form.Row>      
                <Form.Row className='mt-3'>              
                    <Form.Control 
                        type='input'
                        value={email}
                        placeholder='Email'
                        onChange={(e) => this.setState({ email: e.target.value })}
                    >
                    </Form.Control>
                </Form.Row>
                <Form.Row className='mt-3'>
                    <Form.Control 
                        type='input'
                        value={password}
                        placeholder='Password'
                        onChange={(e) => this.setState({ password: e.target.value })}
                    >
                    </Form.Control>
                </Form.Row>                    
                <Form.Row className='mt-4'>  
                    <Button variant='primary' block onClick={() => this.handleSubmit()}>Register</Button>
                </Form.Row>
                <Form.Row className='mt-4'>
                    <div>{message}</div>
                  </Form.Row>
                </Form>
            </Container>
            </div>            
        )
    }
}