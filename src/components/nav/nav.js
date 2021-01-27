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
                    <li className="nav-item pt-4">
                        <Link to={'/search'} className="nav-link">Search</Link>
                    </li>
                    <li className="nav-item pt-4">
                        <Link to={'/'} onClick={() => this.handleLogout()} className="nav-link">Logout</Link>
                    </li>
                    <li className="nav-item pt-4">
                        <Link to={'/'} className="nav-link">Signed in as: {this.props.user.name}</Link>
                    </li>                                 
                </ul>    
            )
        } else {
            buttons = (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item pt-4">
                        <Link to={'/login'} className="nav-link">Login</Link>
                    </li>
                    <li className="nav-item pt-4">
                        <Link to={'/register'} className="nav-link">Sign up</Link>
                    </li>
                </ul>
            )
        }

        return (
            <nav className="navbar navbar-expand navbar-dark bg-dark p-4">
                <Link to={'/'}>
                    <img className="navbar-brand" src={logo} alt="logo" />
                </Link> 
                <div>                   
                    {buttons}
                </div>    
            </nav>
        )
    }
}