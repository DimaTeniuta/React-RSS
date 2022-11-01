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
      <Label label={props.label} className={classes.wrap} testid="switch">
        <div className={classes.switch}>
          <input id={props.label} type="checkbox" {...props} className={classes.input} ref={ref} />
          <span className={classes.slider}></span>
        </div>
      </Label>
    </>
  );
});
