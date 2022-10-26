import { fetchCards } from 'API/httpRequest';
import Button from 'components/UI/Button/Button';
import InputSearch from 'components/UI/InputSearch/InputSearch';
import { MainContext } from 'context/MainProvider/MainProvider';
import React, { FC, useContext, useEffect, useState } from 'react';
import { MainReducer } from 'types/mainProviderTypes';
import localStorageModule from 'utils/localStorage';
import classes from './Search.module.scss';

interface SearchProps {
  toggleLoader: () => void;
}

const Search: FC<SearchProps> = ({ toggleLoader }): JSX.Element => {
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const { isFirstLoad, dispatchData, dispatchFirstLoad } = useContext(MainContext);

  const getNewCards = async (value?: string): Promise<void> => {
    const queryValue = value && typeof value === 'string' ? value : searchValue;
    setIsSearch(true);
    toggleLoader();
    const data = await fetchCards(queryValue);
    dispatchData!({ type: MainReducer.DATA, payload: data });
    toggleLoader();
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
    if (isFirstLoad) {
      setSearchValue(value);
      getNewCards(value);
      dispatchFirstLoad!({ type: MainReducer.FIRST_LOAD, payload: false });
    } else {
      setSearchValue(value);
    }
  }, []);

  useEffect(() => {
    if (isSearch) localStorageModule.setValue('inputValue', searchValue);
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
