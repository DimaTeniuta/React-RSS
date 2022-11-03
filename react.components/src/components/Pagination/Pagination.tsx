import { fetchCards } from 'API/httpRequest';
import Button from 'components/UI/Button/Button';
import React, { useEffect, useState } from 'react';
import classes from './Pagination.module.scss';
import { LocalStorageRequestValue } from 'types/searchTypes';
import localStorageModule from 'utils/localStorage';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { FIRST_PAGE, mainSlice } from 'store/reducers/mainSlice';

const Pagination = (): JSX.Element => {
  const [isDisabledPrevBtn, setIsDisabledPrevBtn] = useState<boolean>(true);
  const [isDisabledNextBtn, setIsDisabledNextBtn] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { data, pageValue } = useAppSelector((state) => state.mainReducer);
  const { page, searchValue, orientation, perPage } = pageValue;
  const { setPageValue } = mainSlice.actions;

  const saveValues = (searchValue: string, orientation: string, perPage: string, page: number) => {
    dispatch(setPageValue({ searchValue, orientation, perPage, page }));
    localStorageModule.setValue(LocalStorageRequestValue.PAGE, page);
  };

  const getNewData = async (page: number) => {
    dispatch(fetchCards([searchValue, orientation, perPage, String(page)]));
    saveValues(searchValue, orientation, perPage, page);
  };

  const switchNextPage = (): void => {
    getNewData(page + 1);
  };

  const switchPrevPage = (): void => {
    getNewData(page - 1);
  };

  const switchFirstPage = (): void => {
    getNewData(FIRST_PAGE);
  };

  const switchLastPage = (): void => {
    getNewData(data.total_pages);
  };

  useEffect(() => {
    if (page === FIRST_PAGE && page === data.total_pages) {
      setIsDisabledPrevBtn(true);
      setIsDisabledNextBtn(true);
    } else if (page === FIRST_PAGE) {
      setIsDisabledPrevBtn(true);
      setIsDisabledNextBtn(false);
    } else if (page === data.total_pages) {
      setIsDisabledPrevBtn(false);
      setIsDisabledNextBtn(true);
    } else {
      setIsDisabledPrevBtn(false);
      setIsDisabledNextBtn(false);
    }
  }, [data.total_pages, page]);

  return (
    <div className={classes.wrap} data-testid="pagination">
      <Button
        className={classes.btn}
        onClick={switchFirstPage}
        disabled={isDisabledPrevBtn}
        data-testid="firstPageBtn"
      >
        &#5176;&#5176;
      </Button>
      <Button
        className={classes.btn}
        onClick={switchPrevPage}
        disabled={isDisabledPrevBtn}
        data-testid="prevPageBtn"
      >
        &#5176;
      </Button>
      <div className={classes.box} data-testid="paginationPage">
        {page} / {data.total_pages}
      </div>
      <Button
        className={classes.btn}
        onClick={switchNextPage}
        disabled={isDisabledNextBtn}
        data-testid="nextPageBtn"
      >
        &#5171;
      </Button>
      <Button
        className={classes.btn}
        onClick={switchLastPage}
        disabled={isDisabledNextBtn}
        data-testid="lastPageBtn"
      >
        &#5171;&#5171;
      </Button>
    </div>
  );
};

export default Pagination;
