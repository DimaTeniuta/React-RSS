import { fetchCards } from 'API/httpRequest';
import Button from 'components/UI/Button/Button';
import InputSearch from 'components/UI/InputSearch/InputSearch';
import Select from 'components/UI/Select/Select';
import { FIRST_PAGE, MainContext } from 'context/MainProvider/MainProvider';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { MainReducer } from 'types/mainProviderTypes';
import localStorageModule from 'utils/localStorage';
import classes from './Search.module.scss';
import optionsSort from '../../data/optionsForSearchSorting.json';
import optionsAmountCard from '../../data/optionsForAmountCard.json';
import {
  DefaultRequestValue,
  DefaultSelectValue,
  LocalStorageRequestValue,
} from 'types/searchTypes';

interface SearchProps {
  toggleLoader: () => void;
}

const Search: FC<SearchProps> = ({ toggleLoader }): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { state, dispatchState } = useContext(MainContext);
  const sortValueRef = useRef<HTMLSelectElement>(null);
  const perPageRef = useRef<HTMLSelectElement>(null);
  const lastRequestRef = useRef<string>(
    localStorageModule.getValue(LocalStorageRequestValue.INPUT) || ''
  );
  const lastOrientationRef = useRef<string>(
    localStorageModule.getValue(LocalStorageRequestValue.ORIENTATION) || ''
  );
  const lastPerPageRef = useRef<string>(
    localStorageModule.getValue(LocalStorageRequestValue.PER_PAGE) || ''
  );

  const getNewCards = async (
    value?: string,
    orientationValue?: string,
    perPageValue?: string,
    pageValue?: string
  ): Promise<void> => {
    toggleLoader();
    const queryValue = value ?? searchValue;
    const orientation = orientationValue || sortValueRef?.current!.value;
    const perPage = perPageValue || perPageRef?.current!.value;
    const page = pageValue || FIRST_PAGE;
    const pageValues = {
      queryValue,
      orientation,
      perPage,
      page: +page,
    };
    lastRequestRef.current = searchValue;
    lastOrientationRef.current = orientation;
    lastPerPageRef.current = perPage;
    localStorageModule.setValue(LocalStorageRequestValue.PAGE, page);
    dispatchState({
      type: MainReducer.PAGE_VALUE,
      payload: pageValues,
    });
    const data = await fetchCards(queryValue, orientation, perPage, String(page));
    dispatchState({ type: MainReducer.DATA, payload: data });
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
    setSearchValue(DefaultRequestValue.INPUT);
  };

  const reloadMainPage = (): void => {
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
    if (state.firstLoad) {
      setSearchValue(value);
      getNewCards(value, orientation, perPage, page);
      dispatchState({ type: MainReducer.FIRST_LOAD, payload: false });
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
    reloadMainPage();
    return () => {
      localStorageModule.setValue(LocalStorageRequestValue.INPUT, lastRequestRef.current);
      localStorageModule.setValue(LocalStorageRequestValue.ORIENTATION, lastOrientationRef.current);
      localStorageModule.setValue(LocalStorageRequestValue.PER_PAGE, lastPerPageRef.current);
    };
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
