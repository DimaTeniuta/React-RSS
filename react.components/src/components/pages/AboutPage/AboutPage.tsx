import ModalWindow from 'components/TextWindow/TextWindow';
import React from 'react';
import classes from './AboutPage.module.scss';

const AboutPage = (): JSX.Element => {
  return (
    <div className={classes.container}>
      <ModalWindow title="Rolling Scopes School">React Course</ModalWindow>
    </div>
  );
};

export default AboutPage;
