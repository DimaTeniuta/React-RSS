import React, { FC } from 'react';
import Button from '../Button/Button';
import classes from './InputSearch.module.scss';

interface InputProps {
  type: string;
  placeholder: string;
  autoFocus: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  clearInput: () => void;
}

const InputSearch: FC<InputProps> = (props): JSX.Element => {
  return (
    <div>
      <input
        className={classes.myInput}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
      />
      <Button className={classes.clearBtn} onClick={props.clearInput} data-testid="clearBtn" />
    </div>
  );
};

export default InputSearch;
