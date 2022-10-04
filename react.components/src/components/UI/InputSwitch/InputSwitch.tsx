import React, { FC } from 'react';
import classes from './InputSwitch.module.scss';

interface SwitchProps {
  label: string;
  title: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
  error?: string;
  onClick?: () => void;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputSwitch: FC<SwitchProps> = React.forwardRef((props, ref) => {
  return (
    <>
      <label htmlFor={props.label} className={classes.wrap}>
        {props.title}
        <div className={classes.switch} onClick={props.onClick} data-testid="switch">
          <input {...props} type="checkbox" {...props} className={classes.input} ref={ref} />
          <span className={classes.slider}></span>
        </div>
      </label>
    </>
  );
});
