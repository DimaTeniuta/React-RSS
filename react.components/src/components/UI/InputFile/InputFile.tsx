import React, { FC } from 'react';
import { Label } from '../Label/Label';
import classes from './InputFile.module.scss';

interface InputFileProps {
  label: string;
  title: string;
  ref: React.ForwardedRef<HTMLInputElement>;
  ready: string;
  onClick: () => void;
  error?: string;
}

export const InputFile: FC<InputFileProps> = React.forwardRef((props, ref) => {
  return (
    <Label label={props.label} title={props.title} error={props.error} className={classes.wrap}>
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
      <span className={props.ready === 'true' ? classes.img : ''}></span>
    </Label>
  );
});
