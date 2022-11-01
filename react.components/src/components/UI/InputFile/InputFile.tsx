import React, { FC } from 'react';
import Label from '../Label/Label';
import classes from './InputFile.module.scss';

interface InputFileProps {
  label: string;
  title: string;
  ref?: React.ForwardedRef<HTMLInputElement>;
  ready?: boolean;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
}

const InputFile: FC<InputFileProps> = React.forwardRef((props, ref): JSX.Element => {
  return (
    <>
      <div className={classes.title}>{props.title}</div>
      <Label label={props.label} className={classes.wrap}>
        <input
          {...props}
          accept={props.accept}
          id={props.label}
          type="file"
          className={classes.input}
          ref={ref}
          data-testid="inputFile"
        />
        <p className={classes.error}>{props.error}</p>
        <div className={classes.btn}>Upload File</div>
        {props.ready ? <span className={classes.img} data-testid="readyFile"></span> : <></>}
      </Label>
    </>
  );
});

export default InputFile;
