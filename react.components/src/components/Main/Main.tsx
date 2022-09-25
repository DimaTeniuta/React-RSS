import { Card } from 'components/Card/Card';
import Error404 from 'components/Error404/Error404';
import MyButton from 'components/UI/button/MyButton';
import MyInput from 'components/UI/input/MyInput';
import React, { Component } from 'react';
import { ResultsData } from 'types/generalTypes';
import { fetchCards } from 'API/httpRequest';
import localStorageModule from 'utils/localStorage';
import classes from './Main.module.scss';

type StateMain = {
  data: ResultsData[];
  value: string;
  isInput: boolean;
};

type PropsMain = object;

export default class Main extends Component<PropsMain, StateMain> {
  constructor(props: PropsMain) {
    super(props);
    this.state = {
      data: [],
      value: '',
      isInput: false,
    };
  }

  getInputValue = (value: string): void => {
    this.setState(() => ({
      isInput: true,
      value: value,
    }));
  };

  setNewImages = () => {
    const lastRequest: string | null = localStorageModule.getValue('lastRequest');
    if (this.state.value && this.state.isInput) {
      this.getCurrentImages(this.state.value);
      return;
    }
    if (lastRequest) {
      this.getCurrentImages(lastRequest);
    }
  };

  getCurrentImages = async (value?: string) => {
    const data = await fetchCards(value);
    this.setState(() => ({
      data: data,
    }));
  };

  firstDownloadCars = async () => {
    const lastInput: string | null = localStorageModule.getValue('inputValue');
    if (!lastInput) {
      this.setState(() => ({
        value: 'purple',
      }));
      this.getCurrentImages('purple');
      return;
    }
    if (lastInput) {
      this.setState(() => ({
        value: lastInput,
      }));
      this.getCurrentImages(lastInput);
      return;
    }
  };

  componentDidMount = async (): Promise<void> => {
    this.firstDownloadCars();
  };

  render() {
    return (
      <div className={classes.container} data-testid="main-page">
        <div className={classes.wrapInput}>
          <MyInput
            isClearBtn={true}
            onKeyEnter={this.setNewImages}
            getValue={this.getInputValue}
            type="text"
            placeholder="Search"
            autoFocus={true}
          />
          <MyButton data-testid="test-search-btn" onClick={this.setNewImages}>
            Search
          </MyButton>
        </div>
        <div className={classes.wrapCards}>
          {this.state.data.length ? (
            this.state.data.map((el) => <Card key={el.id} data={el} />)
          ) : (
            <Error404 title="Not Found">Try entering another query</Error404>
          )}
        </div>
      </div>
    );
  }
}
