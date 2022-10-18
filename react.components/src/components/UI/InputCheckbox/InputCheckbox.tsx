import React, { FC } from 'react';
import Label from '../Label/Label';
import classes from './InputCheckbox.module.scss';

interface InputCheckboxProps {
  label: string;
  title: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
  onClick?: () => void;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputCheckbox: FC<InputCheckboxProps> = React.forwardRef((props, ref): JSX.Element => {
  return (
    <Label label={props.label} title={props.title} className={classes.wrap}>
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
    </Label>
  );
});

export default InputCheckbox;
