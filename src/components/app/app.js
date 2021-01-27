import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Nav from './../nav/nav';
import Home from '../pages/home';
import Login from '../pages/login';
import Register from '../pages/register';
import SearchLyrics from '../pages/lyrics/searchLyrics';

export default class App extends Component {
  constructor () {
    super();
    this.state = { 
        user : null
    }
  }

  componentDidMount() {
    this.setUser();
  }

  async setUser() {
    let token = sessionStorage.getItem('token');
    console.log(token);
    
    await fetch('https://localhost:44307/api/User/User', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': 'Bearer ' + token
      }
    })
    .then(async response => {
      const data = await response.json();

      if(!response.ok) {
        const error = (data && data.message) || response.status;
        return Promise.reject(error);
      }

      console.log(data);
      this.setState({ user: data });
    })
    .catch(error => {
      this.setState({ errorMessage: error.toString() });
      console.error('Error: ', error);
    })
  }

  handleLogout() {
    this.setState({ user: null });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav user={this.state.user} onLoggedOut={() => this.handleLogout()} />  
          <div className="auth-wrapper">
              <Switch>
                <Route exact path="/" component={() => <Home user={this.state.user}/>} />
                <Route exact path="/login" component={() => <Login setUser={() => this.setUser()}/>} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/search" component={() => <SearchLyrics user={this.state.user}/>} />
              </Switch>           
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

