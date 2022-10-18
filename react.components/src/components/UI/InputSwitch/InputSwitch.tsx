import React, { FC } from 'react';
import Label from '../Label/Label';
import classes from './InputSwitch.module.scss';

interface SwitchProps {
  label: string;
  title: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
  onClick?: () => void;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputSwitch: FC<SwitchProps> = React.forwardRef((props, ref): JSX.Element => {
  return (
    <Label label={props.label} title={props.title} className={classes.wrap}>
      <div className={classes.switch}>
        <input
          {...props}
          type="checkbox"
          {...props}
          className={classes.input}
          ref={ref}
          data-testid="switch"
        />
        <span className={classes.slider} onClick={props.onClick} data-testid="btn-switch"></span>
      </div>
    </Label>
  );
});
