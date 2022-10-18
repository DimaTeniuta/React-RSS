import Button from 'components/UI/Button/Button';
import React, { FC, ReactNode } from 'react';
import classes from './ModalWindow.module.scss';

interface ModalWindowProps {
  onClick: () => void;
  children: ReactNode;
}

export const ModalWindow: FC<ModalWindowProps> = (props): JSX.Element => {
  return (
    <div className={classes.overlay} onClick={props.onClick} data-testid="modalWindowWrap">
      <div className={classes.modal} onClick={(e) => e.stopPropagation()} data-testid="modalWindow">
        {props.children}

        <Button
          className={classes.closeBtn}
          onClick={props.onClick}
          data-testid="btnCloseModalWindow"
        ></Button>
      </div>
    </div>
  );
};
