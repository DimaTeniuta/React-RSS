import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss';

export default class Header extends Component {
  render() {
    return (
      <header className={classes.header}>
        <div className={classes.wrapBtn}>
          <Link className={classes.navLink} to="/" data-testid="about-link">
            About Us
          </Link>
          <Link className={classes.navLink} to="/main" data-testid="main-link">
            Main
          </Link>
        </div>
      </header>
    );
  }
}
