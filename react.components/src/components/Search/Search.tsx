import { fetchCards } from 'API/httpRequest';
import Button from 'components/UI/Button/Button';
import InputSearch from 'components/UI/InputSearch/InputSearch';
import React, { FC, useEffect, useState } from 'react';
import { ResultsData } from 'types/generalTypes';
import localStorageModule from 'utils/localStorage';
import classes from './Search.module.scss';

interface SearchProps {
  setData: (data: ResultsData[]) => void;
  showLoader: () => void;
}

const Search: FC<SearchProps> = (props): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSendHttpRequest, setIsSendHttpRequest] = useState<boolean>(false);

  const getNewCards = async (value?: string): Promise<void> => {
    const queryValue = value ?? searchValue;
    setIsSendHttpRequest((prev) => !prev);
    props.showLoader();
    const data = await fetchCards(queryValue);
    props.setData(data);
  };

  const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      getNewCards();
    }
  };

  const getValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setSearchValue(value);
  };

  const clearInput = (): void => {
    setSearchValue('');
  };

  useEffect(() => {
    const value = localStorageModule.getValue('inputValue') || '';
    setSearchValue(value);
    getNewCards(value);
  }, []);

  useEffect(() => {
    localStorageModule.setValue('inputValue', searchValue);
  }, [isSendHttpRequest]);

  const onClick = (): void => {
    getNewCards();
  };

  return (
    <div className={classes.wrap} data-testid="search-test">
      <InputSearch
        type="text"
        placeholder="Search"
        autoFocus={true}
        value={searchValue}
        onChange={getValue}
        onKeyDown={onEnterPress}
        clearInput={clearInput}
      />
      <Button onClick={onClick} data-testid="test-search-btn">
        Search
      </Button>
    </div>
  );
};

export default Search;
