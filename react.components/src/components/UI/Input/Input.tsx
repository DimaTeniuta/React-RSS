import React, { FC } from 'react';
import classes from './Input.module.scss';

interface InputProps {
  type: string;
  label: string;
  title: string;
  className: string;
  labelclass?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.ForwardedRef<HTMLInputElement>;
  error?: string;
  errorclass?: string;
}

export const Input: FC<InputProps> = React.forwardRef((props, ref) => {
  return (
    <>
      <label className={props.labelclass ?? classes.wrap} htmlFor={props.label}>
        {props.title}
        <input {...props} ref={ref} />
        <p className={props.errorclass ?? classes.error}>{props.error}</p>
      </label>
    </>
  );
});
