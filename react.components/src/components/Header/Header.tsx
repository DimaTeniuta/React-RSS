import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="header__wrap-btn">
          <Link className="header__nav-link" to="/">
            About
          </Link>
          <Link className="header__nav-link" to="/main">
            Main
          </Link>
        </div>
      </header>
    );
  }
}
