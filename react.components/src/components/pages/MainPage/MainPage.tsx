import { fetchCards } from 'API/httpRequest';
import { Card } from 'components/Card/Card';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import Button from 'components/UI/Button/Button';
import InputSearch from 'components/UI/InputSearch/InputSearch';
import React, { Component } from 'react';
import { ResultsData } from 'types/generalTypes';
import localStorageModule from 'utils/localStorage';
import classes from './MainPage.module.scss';

type StateMain = {
  data: ResultsData[];
  value: string;
  isClick: boolean;
};

type PropsMain = object;

export default class MainPage extends Component<PropsMain, StateMain> {
  constructor(props: PropsMain) {
    super(props);
    this.state = {
      data: [],
      value: '',
      isClick: false,
    };
  }

  getInputValue = (value: string): void => {
    this.setState({ value });
  };

  setNewImages = (): void => {
    if (this.state.value) {
      this.getCurrentImages(this.state.value);
    }
  };

  getCurrentImages = async (value?: string): Promise<void> => {
    const data = await fetchCards(value);
    this.setState({ data });
  };

  changeCards = (): void => {
    if (this.state.isClick) {
      this.setState({ isClick: false });
      this.setNewImages();
    }
  };

  firstDownloadCards = (): void => {
    const lastInput: string = localStorageModule.getValue('inputValue') || 'purple';
    this.setState({ value: lastInput });
    this.getCurrentImages(lastInput);
  };

  handleClick = (): void => {
    this.setState({ isClick: true });
  };

  componentDidMount = async (): Promise<void> => {
    this.firstDownloadCards();
  };

  componentDidUpdate = (): void => {
    this.changeCards();
  };

  render() {
    return (
      <div className={classes.container} data-testid="main-page">
        <div className={classes.wrapInput}>
          <InputSearch
            isClearBtn={true}
            onKeyEnter={this.handleClick}
            getValue={this.getInputValue}
            type="text"
            placeholder="Search"
            autoFocus={true}
          />
          <Button
            className={classes.standardBtn}
            onClick={this.handleClick}
            data-testid="test-search-btn"
          >
            Search
          </Button>
        </div>
        <div className={classes.wrapCards}>
          {this.state.data.length ? (
            this.state.data.map((el) => <Card key={el.id} data={el} />)
          ) : (
            <ModalWindow title="Not Found">Try entering another query</ModalWindow>
          )}
        </div>
      </div>
    );
  }
}
