import React, { FC, ReactNode } from 'react';
import classes from './Error404.module.scss';

interface Error404Props {
  children: ReactNode;
  title: string;
}

const Error404: FC<Error404Props> = ({ children, ...props }) => {
  return (
    <div className={classes.wrap} data-testid="error-page">
      <h1 className={classes.title}>{props.title}</h1>
      <p className={classes.message}>{children}</p>
    </div>
  );
};

export default Error404;
