import { fetchCards } from 'API/httpRequest';
import Button from 'components/UI/Button/Button';
import InputSearch from 'components/UI/InputSearch/InputSearch';
import Select from 'components/UI/Select/Select';
import React, { useEffect, useRef, useState } from 'react';
import localStorageModule from 'utils/localStorage';
import classes from './Search.module.scss';
import optionsSort from '../../data/optionsForSearchSorting.json';
import optionsAmountCard from '../../data/optionsForAmountCard.json';
import {
  DefaultRequestValue,
  DefaultSelectValue,
  LocalStorageRequestValue,
} from 'types/searchTypes';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FIRST_PAGE, mainSlice } from 'store/reducers/mainSlice';

const Search = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const sortValueRef = useRef<HTMLSelectElement>(null);
  const perPageRef = useRef<HTMLSelectElement>(null);
  const dispatch = useAppDispatch();
  const { setFirstLoad, setPageValue } = mainSlice.actions;
  const { isFirstLoad } = useAppSelector((state) => state.mainReducer);

  const saveValues = (searchValue: string, orientation: string, perPage: string, page: number) => {
    localStorageModule.setValue(LocalStorageRequestValue.INPUT, searchValue);
    localStorageModule.setValue(LocalStorageRequestValue.ORIENTATION, orientation);
    localStorageModule.setValue(LocalStorageRequestValue.PER_PAGE, perPage);
    localStorageModule.setValue(LocalStorageRequestValue.PAGE, page);
    dispatch(setPageValue({ searchValue, orientation, perPage, page }));
  };

  const getNewCards = async (
    value?: string,
    orientationValue?: string,
    perPageValue?: string,
    pageValue?: string
  ): Promise<void> => {
    const queryValue = value ?? searchValue;
    const orientation = orientationValue || sortValueRef?.current!.value;
    const perPage = perPageValue || perPageRef?.current!.value;
    const page = pageValue || FIRST_PAGE;
    saveValues(queryValue, orientation, perPage, +page);
    dispatch(fetchCards([queryValue, orientation, perPage, String(page)]));
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
    setSearchValue(DefaultRequestValue.INPUT);
  };

  const reloadApp = (): void => {
    const value =
      localStorageModule.getValue(LocalStorageRequestValue.INPUT) || DefaultRequestValue.INPUT;
    const orientation =
      localStorageModule.getValue(LocalStorageRequestValue.ORIENTATION) ||
      DefaultRequestValue.ORIENTATION;
    const perPage =
      localStorageModule.getValue(LocalStorageRequestValue.PER_PAGE) ||
      DefaultRequestValue.PER_PAGE;
    const page =
      localStorageModule.getValue(LocalStorageRequestValue.PAGE) || DefaultRequestValue.PAGE;
    sortValueRef.current!.value = orientation;
    perPageRef.current!.value = perPage;
    if (isFirstLoad) {
      setSearchValue(value);
      getNewCards(value, orientation, perPage, page);
      dispatch(setFirstLoad(false));
    } else {
      setSearchValue(value);
      sortValueRef.current!.value = orientation;
      perPageRef.current!.value = perPage;
    }
  };

  const onClick = (): void => {
    getNewCards();
  };

  useEffect(() => {
    reloadApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      <div className={classes.selectWrap}>
        <Select
          className={classes.select}
          label="searchSort"
          options={optionsSort}
          defaultValue={DefaultSelectValue.ORIENTATION}
          ref={sortValueRef}
        />
        <Select
          className={classes.select}
          label="searchPerPage"
          options={optionsAmountCard}
          defaultValue={DefaultSelectValue.PER_PAGE}
          ref={perPageRef}
        />
      </div>

      <Button onClick={onClick} data-testid="test-search-btn">
        Search
      </Button>
    </div>
  );
};

export default Search;
