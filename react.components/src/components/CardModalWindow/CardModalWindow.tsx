import Button from 'components/UI/Button/Button';
import { ModalWindow } from 'components/UI/ModalWindow/ModalWindow';
import React, { FC } from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './CardModalWindow.module.scss';

interface CardModalWindowProps {
  onClick: () => void;
  data: ResultsData;
}

export const CardModalWindow: FC<CardModalWindowProps> = (props): JSX.Element => {
  return (
    <ModalWindow onClick={props.onClick}>
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
    </ModalWindow>
  );
};
