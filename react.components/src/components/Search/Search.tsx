import { fetchCards } from 'API/httpRequest';
import Button from 'components/UI/Button/Button';
import InputSearch from 'components/UI/InputSearch/InputSearch';
import { MainContext } from 'context/MainProvider/MainProvider';
import React, { FC, useContext, useEffect, useState } from 'react';
import localStorageModule from 'utils/localStorage';
import classes from './Search.module.scss';

interface SearchProps {
  toggleLoader: () => void;
}

const Search: FC<SearchProps> = ({ toggleLoader }): JSX.Element => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const { searchValue, dispatchData, dispatchSearch } = useContext(MainContext);

  const getNewCards = async (value?: string): Promise<void> => {
    const queryValue = value && typeof value === 'string' ? value : searchValue;
    setIsSearch((prev) => !prev);
    toggleLoader();
    const data = await fetchCards(queryValue);
    dispatchData!({ type: 'add', payload: data });
    toggleLoader();
  };

  const onEnterPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      getNewCards();
    }
  };

  const getValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    dispatchSearch!({ type: 'search', payload: value });
  };

  const clearInput = (): void => {
    dispatchSearch!({ type: 'search', payload: '' });
  };

  useEffect(() => {
    if (!searchValue) {
      const value = localStorageModule.getValue('inputValue') || '';
      dispatchSearch!({ type: 'search', payload: value });
      getNewCards(value);
    }
  }, []);

  useEffect(() => {
    localStorageModule.setValue('inputValue', searchValue);
  }, [isSearch]);

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
      <Button onClick={getNewCards} data-testid="test-search-btn">
        Search
      </Button>
    </div>
  );
};

export default Search;
