import React, { FC } from 'react';
import { Label } from '../Label/Label';
import classes from './Input.module.scss';

interface InputProps {
  label: string;
  title: string;
  type: string;
  testid?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.ForwardedRef<HTMLInputElement>;
  error?: string;
}

const Input: FC<InputProps> = React.forwardRef((props, ref) => {
  const isTypeText = props.type === 'text';
  return (
    <Label label={props.label} title={props.title} error={props.error}>
      <input
        {...props}
        className={isTypeText ? classes.inputText : classes.inputDate}
        ref={ref}
        data-testid={props.testid}
      />
    </Label>
  );
});

export default Input;
