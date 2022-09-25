import React, { FC, ReactNode } from 'react';
import classes from './ModalWindow.module.scss';

interface ModalProps {
  children: ReactNode;
  title: string;
}

const ModalWindow: FC<ModalProps> = ({ children, ...props }) => {
  return (
    <div className={classes.wrap} data-testid="modal-test">
      <h1 className={classes.title}>{props.title}</h1>
      <p className={classes.message}>{children}</p>
    </div>
  );
};

export default ModalWindow;
