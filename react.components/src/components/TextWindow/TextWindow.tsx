import React, { FC } from 'react';
import classes from './TextWindow.module.scss';

interface ModalProps {
  children: string;
  title: string;
}

const TextWindow: FC<ModalProps> = ({ children, ...props }): JSX.Element => {
  return (
    <div className={classes.wrap} data-testid="modal-test">
      <h1 className={classes.title}>{props.title}</h1>
      <p className={classes.message}>{children}</p>
    </div>
  );
};

export default TextWindow;
