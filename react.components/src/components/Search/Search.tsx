import { fetchCards } from 'API/httpRequest';
import Button from 'components/UI/Button/Button';
import InputSearch from 'components/UI/InputSearch/InputSearch';
import React, { Component } from 'react';
import { ResultsData } from 'types/generalTypes';
import localStorageModule from 'utils/localStorage';
import classes from './Search.module.scss';

interface SearchProps {
  getData: (data: ResultsData[]) => void;
}

interface SearchState {
  value: string;
}

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      value: '',
    };
  }

  getNewCards = async (value?: string): Promise<void> => {
    if (value && typeof value === 'string') {
      const data = await fetchCards(value);
      this.props.getData(data);
      return;
    }

    const data = await fetchCards(this.state.value);
    this.props.getData(data);
  };

  onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      this.getNewCards();
    }
  };

  getValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    this.setState({ value });
  };

  clearInput = () => {
    this.setState({ value: '' });
  };

  componentDidMount = (): void => {
    const value = localStorageModule.getValue('inputValue') || '';
    this.setState({ value });
    this.getNewCards(value);
  };

  componentWillUnmount = (): void => {
    localStorageModule.setValue('inputValue', this.state.value);
  };

  render() {
    return (
      <div className={classes.wrap}>
        <InputSearch
          type="text"
          placeholder="Search"
          autoFocus={true}
          value={this.state.value}
          onChange={this.getValue}
          onKeyDown={this.onEnterPress}
          clearInput={this.clearInput}
        />
        <Button onClick={this.getNewCards} data-testid="test-search-btn">
          Search
        </Button>
      </div>
    );
  }
}
