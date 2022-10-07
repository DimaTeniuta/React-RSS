import React, { FC } from 'react';
import classes from './InputFile.module.scss';

interface InputFileProps {
  label: string;
  title: string;
  ref: React.ForwardedRef<HTMLInputElement>;
  ready: string;
  error: string;
  onClick: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputFile: FC<InputFileProps> = React.forwardRef((props, ref) => {
  return (
    <>
      <label htmlFor={props.label} className={classes.wrap}>
        {props.title}
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
        <span className={props.ready ? classes.img : ''}></span>
        <p className={classes.error}>{props.error}</p>
      </label>
    </>
  );
});
