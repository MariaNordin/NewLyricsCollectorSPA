import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container, Form, Button} from 'react-bootstrap';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {  
            name: '',
            password: '',
            loggedIn: false
        }
    }

    async handleSubmit() {
        await fetch('https://localhost:44307/api/User/Login', {
          method: "POST",
          body: JSON.stringify ({
                  name: this.state.name,
                  password: this.state.password,
          }),
          headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        })
        .then(async response => {
            const data = await response.json();
      
            if(!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
            }
      
            sessionStorage.setItem('token', data.token);
            this.props.setUser();
            console.log(data);
            this.setState({ loggedIn: true });
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() });
            console.error('Error: ', error);
        })
    } 

    render() {
        if(this.state.loggedIn === true) {
            return <Redirect to={'/'}/>;
        }
        const { password, name } = this.state;
        return (
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
                        value={password}
                        placeholder='Password'
                        onChange={(e) => this.setState({ password: e.target.value })}
                    >
                    </Form.Control>
                </Form.Row>                    
                <Form.Row className='mt-4'>  
                    <Button variant='primary' block onClick={() => this.handleSubmit()}>Login</Button>
                </Form.Row>
                </Form>
            </Container>
        )
    }
}