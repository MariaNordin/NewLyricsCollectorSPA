import React, { Component } from 'react';
import { Container, Form, Button} from 'react-bootstrap';


export default class Register extends Component {
    render() {
        
        return (
            <Container>
                <Form className='mt-4 mb-4'>
                <Form.Row className='mt-4'>
                    <Form.Control 
                        type='input' 
                        placeholder='Username'
                    >
                    </Form.Control>
                </Form.Row>      
                <Form.Row className='mt-3'>              
                    <Form.Control 
                        type='email'  
                        placeholder='Email' 
                    >
                    </Form.Control>
                </Form.Row>
                <Form.Row className='mt-3'>
                    <Form.Control 
                        type='input' 
                        placeholder='Password'
                    >
                    </Form.Control>
                </Form.Row>          
                <Form.Row className='mt-3'>
                    <Form.Control 
                        type='input' 
                        placeholder='Confirm Password'
                    >
                    </Form.Control>
                </Form.Row>          
                <Form.Row className='mt-4'>  
                    <Button variant='primary' block>Register</Button>
                </Form.Row>
                </Form>
            </Container>
        )
    }
}