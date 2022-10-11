import React, { FC } from 'react';
import classes from './ModalWindow.module.scss';

interface ModalWindowProps {
  active: boolean;
  onClick: () => void;
}

export const ModalWindow: FC<ModalWindowProps> = (props) => {
  return (
    <div className={props.active ? classes.overlayActive : classes.overlay} onClick={props.onClick}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}></div>
    </div>
  );
};
