import { CardModalWindow } from 'components/CardModalWindow/CardModalWindow';
import Button from 'components/UI/Button/Button';
import React, { FC, useState } from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './Card.module.scss';

type PropsCard = {
  data: ResultsData;
};

const Card: FC<PropsCard> = ({ data }): JSX.Element => {
  const [isActiveModalWindow, setIsActiveModalWindow] = useState<boolean>(false);
  const toggleModalWindow = (): void => {
    setIsActiveModalWindow((prevValue) => !prevValue);
  };

  return (
    <>
      <div className={classes.card} data-testid="test-card">
        <img className={classes.images} src={data.urls?.small} alt="card-image" />
        <p className={classes.title}>{data.description ?? 'Unknown'}</p>
        <span className={classes.likes}>{data.likes}</span>
        <div className={classes.icon}></div>
        <Button onClick={toggleModalWindow}>More details</Button>
      </div>
      {isActiveModalWindow && <CardModalWindow onClick={toggleModalWindow} data={data} />}
    </>
  );
};

export default Card;
