import React from 'react';
import classes from './About.module.scss';

export default function About() {
  return (
    <div className={classes.wrap} data-testid="about-page">
      <h1 className={classes.title}>Rolling Scopes School</h1>
      <p className={classes.content}>React Course</p>
    </div>
  );
}
