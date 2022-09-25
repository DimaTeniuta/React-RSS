import { fetchCards } from 'API/httpRequest';
import { Card } from 'components/Card/Card';
import ModalWindow from 'components/ModalWindow/ModalWindow';
import MyButton from 'components/UI/button/MyButton';
import MyInput from 'components/UI/input/MyInput';
import React, { Component } from 'react';
import { ResultsData } from 'types/generalTypes';
import localStorageModule from 'utils/localStorage';
import classes from './MainPage.module.scss';

type StateMain = {
  data: ResultsData[];
  value: string;
};

type PropsMain = object;

export default class MainPage extends Component<PropsMain, StateMain> {
  constructor(props: PropsMain) {
    super(props);
    this.state = {
      data: [],
      value: '',
    };
  }

  getInputValue = (value: string): void => {
    this.setState(() => ({
      value: value,
    }));
  };

  setNewImages = (): void => {
    if (this.state.value) {
      this.getCurrentImages(this.state.value);
      return;
    }
  };

  getCurrentImages = async (value?: string) => {
    const data = await fetchCards(value);
    this.setState(() => ({
      data: data,
    }));
  };

  firstDownloadCards = () => {
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
    this.firstDownloadCards();
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
            <ModalWindow title="Not Found">Try entering another query</ModalWindow>
          )}
        </div>
      </div>
    );
  }
}
