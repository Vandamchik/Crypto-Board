import React from 'react';
import { Link } from "react-router-dom";
import '../styles/Navigation.css'

export function Navigation() {

    return (
        <nav className="navigation-wrapper">
            <h3>Crypto App</h3>
            <span>
                <Link to="/" >Home Page</Link>
                <Link to="/watch-list">Watch List</Link>
            </span>
        </nav>
    );
}