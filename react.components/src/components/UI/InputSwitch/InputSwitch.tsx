import React, { FC } from 'react';
import classes from './InputSwitch.module.scss';

interface SwitchProps {
  ref?: React.ForwardedRef<HTMLInputElement>;
  onClick?: () => void;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputSwitch: FC<SwitchProps> = React.forwardRef((props, ref) => {
  return (
    <div className={classes.wrap}>
      <div className={classes.switch} data-testid="btn-switch">
        <input
          {...props}
          type="checkbox"
          {...props}
          className={classes.input}
          ref={ref}
          data-testid="switch"
        />
        <span className={classes.slider} onClick={props.onClick}></span>
      </div>
    </div>
  );
});
