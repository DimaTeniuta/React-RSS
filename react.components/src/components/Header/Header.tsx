import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Header.module.scss';

const Header = (): JSX.Element => {
  const setActive = (props: { isActive: boolean }): string => {
    return props.isActive ? classes.navLinkActive : classes.navLink;
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <NavLink end className={setActive} to="/" data-testid="about-link">
          About Us
        </NavLink>
        <NavLink to="/main" className={setActive} data-testid="main-link">
          Main
        </NavLink>
        <NavLink to="/form" className={setActive} data-testid="form-link">
          Form
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
