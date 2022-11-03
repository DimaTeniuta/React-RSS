import React, { FC } from 'react';
import { FormData } from 'types/formTypes';
import classes from './FormCard.module.scss';

type StateFormCard = {
  data: FormData;
};

const FormCard: FC<StateFormCard> = ({ data }): JSX.Element => {
  return (
    <div className={classes.card} data-testid="formCard">
      <span
        className={classes.image}
        // style={{ backgroundImage: `url(${URL.createObjectURL(data.avatar)})` }}
        style={{ backgroundImage: `url(${data.avatar})` }}
      ></span>
      <div className={classes.wrapText}>
        <span className={classes.text}>Name: </span> {data.name}
      </div>
      <div className={classes.wrapText}>
        <span className={classes.text}>Surname: </span> {data.surname}
      </div>
      <div className={classes.wrapText}>
        <span className={classes.text}>Birthday: </span> {data.birthday}
      </div>
      <div className={classes.wrapText}>
        <span className={classes.text}>Country: </span> {data.country}
      </div>
      {data.genderMale ? (
        <span className={classes.female} data-testid="test-female"></span>
      ) : (
        <span className={classes.male} data-testid="test-male"></span>
      )}
    </div>
  );
};

export default FormCard;
