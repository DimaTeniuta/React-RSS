import Button from 'components/UI/Button/Button';
import React, { FC } from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './Card.module.scss';

type PropsCard = {
  data: ResultsData;
  onClick: (data: ResultsData) => void;
};

const Card: FC<PropsCard> = ({ data, onClick }): JSX.Element => {
  const setModalWindowData = (): void => {
    onClick(data);
  };

  return (
    <>
      <div className={classes.card} data-testid="test-card">
        <img className={classes.images} src={data.urls?.small} alt="card-image" />
        <p className={classes.title}>{data.description ?? 'Unknown'}</p>
        <span className={classes.likes}>{data.likes}</span>
        <div className={classes.icon}></div>
        <Button onClick={setModalWindowData}>More details</Button>
      </div>
    </>
  );
};

export default Card;
