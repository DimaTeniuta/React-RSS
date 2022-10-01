import { Card } from 'components/Card/Card';
import TextWindow from 'components/TextWindow/TextWindow';
import Search from 'components/Search/Search';
import React, { Component } from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './MainPage.module.scss';

type StateMain = {
  data: ResultsData[];
};

type PropsMain = object;

export default class MainPage extends Component<PropsMain, StateMain> {
  constructor(props: PropsMain) {
    super(props);
    this.state = {
      data: [],
    };
  }

  getCards = (data: ResultsData[]): void => {
    this.setState({ data });
  };

  render() {
    return (
      <div className={classes.container} data-testid="main-page">
        <Search getData={this.getCards} />
        <div className={classes.wrapCards}>
          {this.state.data.length ? (
            this.state.data.map((el) => <Card key={el.id} data={el} />)
          ) : (
            <TextWindow title="Not Found">Try entering another query</TextWindow>
          )}
        </div>
      </div>
    );
  }
}
