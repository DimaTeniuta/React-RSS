import React, { FC } from 'react';
import classes from './MyButton.module.scss';

interface ButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
}

const MyButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.btn}>
      {children}
    </button>
  );
};

export default MyButton;
