import TextWindow from 'components/TextWindow/TextWindow';
import Search from 'components/Search/Search';
import React, { Component } from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './MainPage.module.scss';
import Card from 'components/Card/Card';
import { Loader } from 'components/Loader/Loader';

type StateMain = {
  data: ResultsData[];
  isLoading: boolean;
};

type PropsMain = object;

export default class MainPage extends Component<PropsMain, StateMain> {
  constructor(props: PropsMain) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
    };
  }

  setDataCards = (data: ResultsData[]): void => {
    this.setState({ data, isLoading: false });
  };

  turnOnLoader = (): void => {
    this.setState({ isLoading: true });
  };

  render() {
    return (
      <div className={classes.container} data-testid="main-page">
        <Search setData={this.setDataCards} showLoader={this.turnOnLoader} />

        <div className={classes.wrapCards}>
          {this.state.isLoading ? (
            <Loader />
          ) : this.state.data.length ? (
            this.state.data.map((el) => <Card key={el.id} data={el} />)
          ) : (
            <TextWindow title="Not Found">Try entering another query</TextWindow>
          )}
        </div>
      </div>
    );
  }
}
