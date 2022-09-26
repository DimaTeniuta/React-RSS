import Button from 'components/UI/Button/Button';
import React from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './Card.module.scss';
import btnClasses from '../UI/Button/Button.module.scss';

type DataCard = {
  data: ResultsData;
};

export const Card: React.FC<DataCard> = (props) => {
  const data = props.data;
  return (
    <div className={classes.card} data-testid="test-card">
      <img className={classes.images} src={data.urls?.small} alt="card-image" />
      <p className={classes.title}>{data.description ? data.description : 'Unknown'}</p>
      <span className={classes.likes}>{data.likes}</span>
      <div className={classes.icon}></div>
      <form action={data.urls?.full} target="_blank">
        <Button className={btnClasses.standardBtn}>Full size</Button>
      </form>
    </div>
  );
};
