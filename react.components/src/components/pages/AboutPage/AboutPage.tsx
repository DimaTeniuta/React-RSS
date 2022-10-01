import ModalWindow from 'components/TextWindow/TextWindow';
import React from 'react';
import classes from './AboutPage.module.scss';

export default function AboutPage() {
  return (
    <div className={classes.container}>
      <ModalWindow title="Rolling Scopes School">React Course</ModalWindow>
    </div>
  );
}
