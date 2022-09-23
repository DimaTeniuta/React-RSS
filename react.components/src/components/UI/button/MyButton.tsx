import React, { FC, ReactNode } from 'react';
import './MyButton.css';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const MyButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props} className="btn">
      {children}
    </button>
  );
};

export default MyButton;
