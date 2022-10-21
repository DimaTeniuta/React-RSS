import React, { FC } from 'react';
import classes from './Label.module.scss';

interface LabelProps {
  label: string;
  title?: string;
  children: React.ReactNode;
  error?: string;
  className?: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
}

const Label: FC<LabelProps> = (props): JSX.Element => {
  return (
    <label htmlFor={props.label} className={props.className ?? classes.wrap}>
      <span className={classes.title}>{props.title}</span>
      {props.children}
      <p className={classes.error}>{props.error}</p>
    </label>
  );
};

export default Label;
