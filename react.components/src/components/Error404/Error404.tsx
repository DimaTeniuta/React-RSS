import React, { FC, ReactNode } from 'react';
import './Error404.css';

interface Error404Props {
  children: ReactNode;
  title: string;
}

const Error404: FC<Error404Props> = ({ children, ...props }) => {
  return (
    <div className="error__wrap">
      <h1 className="error__title">{props.title}</h1>
      <p className="error__message">{children}</p>
    </div>
  );
};

export default Error404;
