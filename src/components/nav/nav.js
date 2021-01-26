import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../images/collector.svg';

export default class Nav extends Component {

    handleLogout() {
        sessionStorage.clear();
        this.props.onLoggedOut();
    }

    render() {
        let buttons;

        if(this.props.user !== null) {
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={'/'} onClick={() => this.handleLogout()} className="nav-link">Logout</Link>
                    </li>
                </ul>
            )
        } else {
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to={'/login'} className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/register'} className="nav-link">Sign up</Link>
                    </li>
                </ul>
            )
        }

        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
                <div className="container">
                    <Link to={'/'}>
                        <img className="navbar-brand" src={logo} alt="logo" />
                    </Link>                    
                    <div className="collapse navbar-collapse">
                       {buttons} 
                    </div>
                </div>
            </nav>
        )
    }
}