import MyButton from 'components/UI/button/MyButton';
import React from 'react';
import { ResultsData } from 'types/generalTypes';
import './Card.css';

type DataCard = {
  data: ResultsData;
};

export const Card: React.FC<DataCard> = (props) => {
  const data = props.data;
  return (
    <div data-testid="test-card" className="card">
      <img className="card__image" src={data.urls?.small} alt="card-image" />
      <p className="card__title">{data.description ? data.description : 'Unknown'}</p>
      <span className="card__likes">{data.likes}</span>
      <div className="card__likes__icon"></div>
      <form action={data.urls?.full} target="_blank">
        <MyButton>Full size</MyButton>
      </form>
    </div>
  );
};
