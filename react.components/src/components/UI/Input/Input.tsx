/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import Label from '../Label/Label';
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

// const Input: FC<InputProps> = (props): JSX.Element => {
//   const isTypeText = props.type === 'text';
//   return (
//     <Label label={props.label} title={props.title} error={props.error}>
//       <input
//         {...props}
//         className={isTypeText ? classes.inputText : classes.inputDate}
//         data-testid={props.testid}
//       />
//     </Label>
//   );
// };

const Input: FC<InputProps> = React.forwardRef((props, ref): JSX.Element => {
  const isTypeText = props.type === 'text';
  console.log(props.error);

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
