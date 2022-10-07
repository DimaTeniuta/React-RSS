import React, { FC } from 'react';
import classes from './Input.module.scss';

interface InputProps {
  type: string;
  testid?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: React.ForwardedRef<HTMLInputElement>;
}

export const Input: FC<InputProps> = React.forwardRef((props, ref) => {
  const isTypeText = props.type === 'text';
  return (
    <>
      <input
        {...props}
        className={isTypeText ? classes.inputText : classes.inputDate}
        ref={ref}
        data-testid={props.testid}
      />
    </>
  );
});
