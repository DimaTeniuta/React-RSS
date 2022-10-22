import React, { FC } from 'react';
import Label from '../Label/Label';
import classes from './InputCheckbox.module.scss';

interface InputCheckboxProps {
  label: string;
  title: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
  error?: string;
}

const InputCheckbox: FC<InputCheckboxProps> = React.forwardRef((props, ref): JSX.Element => {
  return (
    <>
      <div className={classes.title}>{props.title}</div>
      <Label label={props.label} className={classes.wrap}>
        <div className={classes.box} data-testid="btn-inputCheckbox">
          <input
            {...props}
            id={props.label}
            type="checkbox"
            className={classes.input}
            ref={ref}
            data-testid="inputCheckbox"
          />
          <span className={classes.img}></span>
        </div>
        <p className={classes.error}>{props.error}</p>
      </Label>
    </>
  );
});

export default InputCheckbox;
