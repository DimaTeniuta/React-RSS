import React, { FC } from 'react';
import classes from './Button.module.scss';

interface ButtonProps {
  children?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className={props.className ?? classes.standardBtn}>
      {children}
    </button>
  );
};

export default Button;
