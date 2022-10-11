import Button from 'components/UI/Button/Button';
import React, { FC } from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './ModalWindow.module.scss';

interface ModalWindowProps {
  active: boolean;
  onClick: () => void;
  data: ResultsData;
}

export const ModalWindow: FC<ModalWindowProps> = (props) => {
  return (
    <div className={props.active ? classes.overlayActive : classes.overlay} onClick={props.onClick}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <div className={classes.text}>
          <p className={classes.textTitle}>Author: </p>
          {props.data.user?.name}
        </div>
        <div className={classes.text}>
          <p className={classes.textTitle}>Nickname: </p>
          {props.data.user?.username}
        </div>
        <div className={classes.wrapSize}>
          <div className={classes.text}>
            <p className={classes.textTitle}>Width: </p>
            {props.data.width}
          </div>
          <div className={classes.text}>
            <p className={classes.textTitle}>Height: </p>
            {props.data.height}
          </div>
        </div>
        <div className={classes.text}>
          <p className={classes.textTitle}>Created: </p>
          {props.data.created_at}
        </div>
        <div className={classes.buttonWrap}>
          <form action={props.data.urls?.full} target="_blank">
            <Button>Full size</Button>
          </form>
        </div>
        <div>
          <Button className={classes.closeBtn} onClick={props.onClick}></Button>
        </div>
      </div>
    </div>
  );
};
