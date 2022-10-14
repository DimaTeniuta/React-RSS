import Button from 'components/UI/Button/Button';
import React, { Component } from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './Card.module.scss';
import { CardModalWindow } from 'components/CardModalWindow/CardModalWindow';

interface StateCard {
  isActiveModalWindow: boolean;
}

type PropsCard = {
  data: ResultsData;
};

export default class Card extends Component<PropsCard, StateCard> {
  constructor(props: PropsCard) {
    super(props);
    this.state = {
      isActiveModalWindow: false,
    };
  }

  toggleModalWindow = (): void => {
    this.setState({ isActiveModalWindow: !this.state.isActiveModalWindow });
  };

  render() {
    return (
      <>
        <div className={classes.card} data-testid="test-card">
          <img className={classes.images} src={this.props.data.urls?.small} alt="card-image" />
          <p className={classes.title}>{this.props.data.description ?? 'Unknown'}</p>
          <span className={classes.likes}>{this.props.data.likes}</span>
          <div className={classes.icon}></div>
          <Button onClick={this.toggleModalWindow}>More details</Button>
        </div>

        {this.state.isActiveModalWindow && (
          <CardModalWindow onClick={this.toggleModalWindow} data={this.props.data} />
        )}
      </>
    );
  }
}
