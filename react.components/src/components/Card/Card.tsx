import Button from 'components/UI/Button/Button';
import { useAppDispatch } from 'hooks/redux';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainSlice } from 'store/reducers/mainSlice';
import { ResultsData } from 'types/generalTypes';
import classes from './Card.module.scss';

type PropsCard = {
  data: ResultsData;
};

const Card: FC<PropsCard> = ({ data }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { setCardValue } = mainSlice.actions;
  const navigate = useNavigate();

  const onClick = (): void => {
    dispatch(setCardValue(data));
    navigate('/main/card');
  };

  return (
    <div className={classes.card} data-testid="test-card">
      <img className={classes.images} src={data.urls?.small} alt="card-image" />
      <p className={classes.title}>{data.description ?? 'Unknown'}</p>
      <span className={classes.likes}>{data.likes}</span>
      <div className={classes.icon}></div>
      <Button onClick={onClick} data-testid="cardBtn">
        More details
      </Button>
    </div>
  );
};

export default Card;
