import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.scss';

export default class Header extends Component {
  setActive = (props: { isActive: boolean }): string => {
    return props.isActive ? classes.navLinkActive : classes.navLink;
  };
  render() {
    return (
      <header className={classes.header}>
        <nav className={classes.nav}>
          <NavLink end className={this.setActive} to="/" data-testid="about-link">
            About Us
          </NavLink>
          <NavLink to="/main" className={this.setActive} data-testid="main-link">
            Main
          </NavLink>
        </nav>
      </header>
    );
  }
}
