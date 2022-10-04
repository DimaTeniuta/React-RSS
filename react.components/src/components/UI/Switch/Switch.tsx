import React, { FC } from 'react';
import classes from './Switch.module.scss';

interface SwitchProps {
  label: string;
  title: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
  error?: string;
  onClick?: () => void;
  onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Switch: FC<SwitchProps> = React.forwardRef((props, ref) => {
  return (
    <>
      <label htmlFor={props.label} className={classes.wrap}>
        {props.title}
        <div className={classes.switch} onClick={props.onClick}>
          <input
            {...props}
            type="checkbox"
            {...props}
            className={classes.input}
            ref={ref}
            data-testid="switch"
          />
          <span className={classes.slider}></span>
        </div>
      </label>
    </>
  );
});
