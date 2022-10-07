import React, { FC } from 'react';
import classes from './Label.module.scss';

interface LabelProps {
  label: string;
  title: string;
  children: React.ReactNode;
  error?: string;
}

export const Label: FC<LabelProps> = (props) => {
  return (
    <>
      <label htmlFor={props.label} className={classes.wrap}>
        <span className={classes.title}>{props.title}</span>
        {props.children}
        <p className={classes.error}>{props.error}</p>
      </label>
    </>
  );
};
