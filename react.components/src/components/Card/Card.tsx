import Button from 'components/UI/Button/Button';
import React, { Component } from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './Card.module.scss';

interface StateCard {
  isActiveModalWindow: boolean;
}

type PropsCard = {
  data: ResultsData;
  onClick: (data: ResultsData) => void;
};

export default class Card extends Component<PropsCard, StateCard> {
  constructor(props: PropsCard) {
    super(props);
    this.state = {
      isActiveModalWindow: false,
    };
  }

  setModalWindowData = (): void => {
    this.props.onClick(this.props.data);
  };

  render() {
    return (
      <>
        <div className={classes.card} data-testid="test-card">
          <img className={classes.images} src={this.props.data.urls?.small} alt="card-image" />
          <p className={classes.title}>{this.props.data.description ?? 'Unknown'}</p>
          <span className={classes.likes}>{this.props.data.likes}</span>
          <div className={classes.icon}></div>
          <Button onClick={this.setModalWindowData}>More details</Button>
        </div>
      </>
    );
  }
}
