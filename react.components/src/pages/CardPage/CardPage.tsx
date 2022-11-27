import Button from 'components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { mainSlice } from 'store/reducers/mainSlice';
import { RoutePath } from 'types/routeTypes';
import { getMainReducer } from 'utils/getReducer';
import classes from './CardPage.module.scss';

const CardPage = () => {
  const dispatch = useAppDispatch();
  const { setCardValue } = mainSlice.actions;
  const { cardValue } = useAppSelector(getMainReducer);
  const navigate = useNavigate();

  const onClick = (): void => {
    dispatch(setCardValue({}));
    navigate(-1);
  };

  return (
    <>
      {cardValue?.urls ? (
        <div className={classes.container} data-testid="cardPage-test">
          <div className={classes.wrap}>
            <img className={classes.images} src={cardValue.urls?.small} alt="card-image" />
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
            <Button onClick={onClick} data-testid="BackBtn">
              Back
            </Button>
          </div>
        </div>
      ) : (
        <Navigate to={RoutePath.MAIN} replace={true} />
      )}
    </>
  );
};

export default CardPage;
