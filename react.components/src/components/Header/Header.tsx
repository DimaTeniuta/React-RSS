import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoutePath } from 'types/routeTypes';
import classes from './Header.module.scss';

const Header = (): JSX.Element => {
  const setActive = (props: { isActive: boolean }): string => {
    return props.isActive ? classes.navLinkActive : classes.navLink;
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <NavLink end className={setActive} to={RoutePath.HOME} data-testid="aboutLink">
          About Us
        </NavLink>
        <NavLink to={RoutePath.MAIN} className={setActive} data-testid="mainLink">
          Main
        </NavLink>
        <NavLink to={RoutePath.FORM} className={setActive} data-testid="formLink">
          Form
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
