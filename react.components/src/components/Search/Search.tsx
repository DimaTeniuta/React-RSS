import { fetchCards } from 'API/httpRequest';
import Button from 'components/UI/Button/Button';
import InputSearch from 'components/UI/InputSearch/InputSearch';
import Select from 'components/UI/Select/Select';
import { MainContext } from 'context/MainProvider/MainProvider';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { MainReducer } from 'types/mainProviderTypes';
import localStorageModule from 'utils/localStorage';
import classes from './Search.module.scss';
import options from '../../data/optionsForSearchSorting.json';

interface SearchProps {
  toggleLoader: () => void;
}

const Search: FC<SearchProps> = ({ toggleLoader }): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { isFirstLoad, dispatchData, dispatchFirstLoad } = useContext(MainContext);
  const sortValueRef = useRef<HTMLSelectElement>(null);

  const getNewCards = async (value?: string, orientationValue?: string): Promise<void> => {
    const queryValue = value && typeof value === 'string' ? value : searchValue;
    const orientation =
      orientationValue ||
      (sortValueRef?.current!.value === 'Orientation' ? 'landscape' : sortValueRef?.current!.value);
    localStorageModule.setValue('sortValue', orientation);
    localStorageModule.setValue('inputValue', searchValue);
    toggleLoader();
    const data = await fetchCards(queryValue, orientation);
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
      const orientation = localStorageModule.getValue('sortValue') || 'landscape';
      getNewCards(value, orientation);
      dispatchFirstLoad!({ type: MainReducer.FIRST_LOAD, payload: false });
    } else {
      setSearchValue(value);
    }
  }, []);

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
      <div>
        <Select
          className={classes.selectSort}
          label="searchSort"
          options={options}
          defaultValue="Orientation"
          ref={sortValueRef}
        />
        <Button onClick={getNewCards} data-testid="test-search-btn">
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
