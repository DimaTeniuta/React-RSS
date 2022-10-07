import React, { FC } from 'react';
import classes from './InputFile.module.scss';

interface InputFileProps {
  ref: React.ForwardedRef<HTMLInputElement>;
  ready: string;
  onClick: () => void;
}

export const InputFile: FC<InputFileProps> = React.forwardRef((props, ref) => {
  return (
    <div className={classes.wrap}>
      <input
        {...props}
        type="file"
        {...props}
        className={classes.input}
        ref={ref}
        data-testid="inputFile"
      />
      <div className={classes.btn} onClick={props.onClick}>
        Upload File
      </div>
      <span className={props.ready && classes.img}></span>
    </div>
  );
});
