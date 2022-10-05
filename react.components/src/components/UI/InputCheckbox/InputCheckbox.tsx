import React, { FC } from 'react';
import classes from './InputCheckbox.module.scss';

interface InputCheckboxProps {
  label: string;
  title: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
  error?: string;
  onClick?: () => void;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputCheckbox: FC<InputCheckboxProps> = React.forwardRef((props, ref) => {
  return (
    <>
      <label htmlFor={props.label} className={classes.wrap}>
        {props.title}
        <div className={classes.box} onClick={props.onClick} data-testid="btn-inputCheckbox">
          <input
            {...props}
            type="checkbox"
            className={classes.input}
            ref={ref}
            data-testid="inputCheckbox"
          />
          <span className={classes.img}></span>
        </div>
        <p className={classes.error}>{props.error}</p>
      </label>
    </>
  );
});
