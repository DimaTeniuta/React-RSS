import React, { FC } from 'react';
import classes from './Input.module.scss';

interface InputProps {
  type: string;
  label: string;
  title: string;
  dataTestId?: string;
  className: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.ForwardedRef<HTMLInputElement>;
  error?: string;
}

export const Input: FC<InputProps> = React.forwardRef((props, ref) => {
  return (
    <>
      <label className={classes.wrap} htmlFor={props.label}>
        {props.title}
        <input {...props} ref={ref} data-testid={props.dataTestId} />
        <p className={classes.error}>{props.error}</p>
      </label>
    </>
  );
});
