import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Form, Button} from 'react-bootstrap';

export default class Register extends Component {
    constructor() {
        super();
        this.state = { 
            email: '', 
            password: '',
            name: '',
            message: '',
            isRegistered: false,
            doLogin: false
        }
    }

    handleSubmit() {
        this.setState({ message: '' });

        const emailRegex = /^\S+@\S+\.\S+$/;
        
        if (this.state.name === "" || this.state.email === "" || this.state.password === "") {
            this.setState({ message: "Can't register empty" });
        }
        else (
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
        .then(async response => {
            const data = await response.json();
      
            if(!response.ok) { 
              const error = (data) || response.status;
              return Promise.reject(error);
            }
      
            this.setState({ message: "Registered!", isRegistered: true });
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('Error: ', error);
        })
    }

    handleLogin() {
        this.setState({ doLogin: true })
    }

    render() {

        let button;

        if (this.state.isRegistered === false) {
            button = (
                <Button variant='primary' block onClick={() => this.handleSubmit()}>Register</Button>
            )
        }
        else {
            button = (
                <Button variant='success' block onClick={() => this.handleLogin()}>Login</Button>
            )
        }

        if(this.state.doLogin === true) {
            return <Redirect to={'/login'}/>;
        }

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
                        type='email'
                        value={email}
                        placeholder='Email'
                        onChange={(e) => this.setState({ email: e.target.value })}
                    >
                    </Form.Control>
                </Form.Row>
                <Form.Row className='mt-3'>
                    <Form.Control 
                        type='password'
                        value={password}
                        placeholder='Password'
                        onChange={(e) => this.setState({ password: e.target.value })}
                    >
                    </Form.Control>
                </Form.Row>                    
                <Form.Row className='mt-4'>  
                    {button}
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