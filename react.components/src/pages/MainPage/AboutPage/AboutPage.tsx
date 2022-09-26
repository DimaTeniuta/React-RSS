import ModalWindow from 'components/ModalWindow/ModalWindow';
import React from 'react';
import classes from './AboutPage.module.scss';

export default function AboutPage() {
  return (
    <div className={classes.container}>
      <ModalWindow title="Rolling Scopes School">React Course</ModalWindow>
    </div>
  );
}
