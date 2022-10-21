import TextWindow from 'components/TextWindow/TextWindow';
import Search from 'components/Search/Search';
import React, { Component } from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './MainPage.module.scss';
import Card from 'components/Card/Card';
import { Loader } from 'components/Loader/Loader';
import { CardModalWindow } from 'components/CardModalWindow/CardModalWindow';

type StateMain = {
  data: ResultsData[];
  isLoading: boolean;
  modalWindowData: ResultsData;
  isActiveModalWindow: boolean;
};

type PropsMain = object;

export default class MainPage extends Component<PropsMain, StateMain> {
  constructor(props: PropsMain) {
    super(props);
    this.state = {
      data: [],
      isLoading: false,
      modalWindowData: {},
      isActiveModalWindow: false,
    };
  }

  toggleModalWindow = (): void => {
    this.setState({ isActiveModalWindow: !this.state.isActiveModalWindow });
  };

  setDataModalWindow = (data: ResultsData): void => {
    this.toggleModalWindow();
    this.setState({ modalWindowData: data });
  };

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
          {this.state.isActiveModalWindow && (
            <CardModalWindow onClick={this.toggleModalWindow} data={this.state.modalWindowData} />
          )}

          {this.state.isLoading ? (
            <Loader />
          ) : this.state.data.length ? (
            this.state.data.map((el) => (
              <Card key={el.id} data={el} onClick={this.setDataModalWindow} />
            ))
          ) : (
            <TextWindow title="Not Found">Try entering another query</TextWindow>
          )}
        </div>
      </div>
    );
  }
}
