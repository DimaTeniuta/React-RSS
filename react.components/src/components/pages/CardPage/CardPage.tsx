import Button from 'components/UI/Button/Button';
import { MainContext } from 'context/MainProvider/MainProvider';
import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { MainReducer } from 'types/mainProviderTypes';
import classes from './CardPage.module.scss';

const CardPage = () => {
  const { cardValue, dispatchCardValue } = useContext(MainContext);
  const navigate = useNavigate();

  const onClick = (): void => {
    dispatchCardValue({ type: MainReducer.CARD_PAGE, payload: {} });
    navigate(-1);
  };

  return (
    <>
      {cardValue?.urls ? (
        <div className={classes.container}>
          <div className={classes.wrap}>
            <img className={classes.images} src={cardValue.urls?.small} alt="card-image" />
            <p className={classes.title}>{cardValue.description ?? 'Unknown'}</p>
            <div className={classes.text}>
              <p className={classes.textTitle}>Author: </p>
              {cardValue.user?.name}
            </div>
            <div className={classes.text}>
              <p className={classes.textTitle}>Nickname: </p>
              {cardValue.user?.username}
            </div>
            <div className={classes.wrapSize}>
              <div className={classes.text}>
                <p className={classes.textTitle}>Width: </p>
                {cardValue.width}
              </div>
              <div className={classes.text}>
                <p className={classes.textTitle}>Height: </p>
                {cardValue.height}
              </div>
            </div>
            <div className={classes.text}>
              <p className={classes.textTitle}>Created: </p>
              {cardValue.created_at}
            </div>
            <Button onClick={onClick}>Back</Button>
          </div>
        </div>
      ) : (
        <Navigate to="/main" replace={true} />
      )}
    </>
  );
};

export default CardPage;
