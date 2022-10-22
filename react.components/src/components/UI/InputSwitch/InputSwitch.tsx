import React, { FC } from 'react';
import Label from '../Label/Label';
import classes from './InputSwitch.module.scss';

interface SwitchProps {
  label: string;
  title: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
}

export const InputSwitch: FC<SwitchProps> = React.forwardRef((props, ref): JSX.Element => {
  return (
    <>
      <div className={classes.title}>{props.title}</div>
      <Label label={props.label} className={classes.wrap}>
        <div className={classes.switch}>
          <input
            {...props}
            id={props.label}
            type="checkbox"
            {...props}
            className={classes.input}
            ref={ref}
            data-testid="switch"
          />
          <span className={classes.slider} data-testid="btn-switch"></span>
        </div>
      </Label>
    </>
  );
});
