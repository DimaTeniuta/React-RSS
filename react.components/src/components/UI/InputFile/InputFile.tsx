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

const InputFile: FC<InputFileProps> = React.forwardRef(
  ({ ready, label, title, accept, error, ...restProps }, ref): JSX.Element => {
    return (
      <>
        <div className={classes.title}>{title}</div>
        <Label label={label} className={classes.wrap}>
          <input
            {...restProps}
            accept={accept}
            id={label}
            type="file"
            className={classes.input}
            ref={ref}
            data-testid="inputFile"
          />
          <p className={classes.error}>{error}</p>
          <div className={classes.btn}>Upload File</div>
          {ready && <span className={classes.img} data-testid="readyFile"></span>}
        </Label>
      </>
    );
  }
);

export default InputFile;
