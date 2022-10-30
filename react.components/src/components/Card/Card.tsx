import Button from 'components/UI/Button/Button';
import { MainContext } from 'context/MainProvider/MainProvider';
import React, { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResultsData } from 'types/generalTypes';
import { MainReducer } from 'types/mainProviderTypes';
import classes from './Card.module.scss';

type PropsCard = {
  data: ResultsData;
};

const Card: FC<PropsCard> = ({ data }): JSX.Element => {
  const { dispatchCardValue } = useContext(MainContext);
  const navigate = useNavigate();
  const onClick = (): void => {
    dispatchCardValue({ type: MainReducer.CARD_PAGE, payload: data });
    navigate('/main/card');
  };

  return (
    <>
      <div className={classes.card} data-testid="test-card">
        <img className={classes.images} src={data.urls?.small} alt="card-image" />
        <p className={classes.title}>{data.description ?? 'Unknown'}</p>
        <span className={classes.likes}>{data.likes}</span>
        <div className={classes.icon}></div>
        <Button onClick={onClick} data-testid="cardBtn">
          More details
        </Button>
      </div>
    </>
  );
};

export default Card;
