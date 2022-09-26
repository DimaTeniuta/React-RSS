import MyButton from 'components/UI/button/MyButton';
import React from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './Card.module.scss';
import btnClasses from '../UI/button/MyButton.module.scss';

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
        <MyButton className={btnClasses.standardBtn}>Full size</MyButton>
      </form>
    </div>
  );
};
