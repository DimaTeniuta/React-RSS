import { fetchCards } from 'API/httpRequest';
import Button from 'components/UI/Button/Button';
import { FIRST_PAGE, MainContext } from 'context/MainProvider/MainProvider';
import React, { FC, useContext, useEffect, useState } from 'react';
import classes from './Pagination.module.scss';
import { MainReducer, PageValue } from 'types/mainProviderTypes';
import { LocalStorageRequestValue } from 'types/searchTypes';
import localStorageModule from 'utils/localStorage';

interface PaginationProps {
  toggleLoader: () => void;
}

const Pagination: FC<PaginationProps> = ({ toggleLoader }): JSX.Element => {
  const { data, pageValue, dispatchData, dispatchPageValue } = useContext(MainContext);
  const [isDisabledPrevBtn, setIsDisabledPrevBtn] = useState<boolean>(true);
  const [isDisabledNextBtn, setIsDisabledNextBtn] = useState<boolean>(true);
  const { page, searchValue, orientation, perPage } = pageValue as PageValue;

  const saveValues = (searchValue: string, orientation: string, perPage: string, page: number) => {
    dispatchPageValue({
      type: MainReducer.PAGE_VALUE,
      payload: { searchValue, orientation, perPage, page },
    });
    localStorageModule.setValue(LocalStorageRequestValue.PAGE, page);
  };

  const getNewData = async (page: number) => {
    toggleLoader();
    const data = await fetchCards(searchValue, orientation, perPage, String(page));
    dispatchData({ type: MainReducer.DATA, payload: data });
    saveValues(searchValue, orientation, perPage, page);
    toggleLoader();
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
  }, [page]);

  return (
    <div className={classes.wrap}>
      <Button className={classes.btn} onClick={switchFirstPage} disabled={isDisabledPrevBtn}>
        &#5176;&#5176;
      </Button>
      <Button className={classes.btn} onClick={switchPrevPage} disabled={isDisabledPrevBtn}>
        &#5176;
      </Button>
      <div className={classes.box}>
        {page} / {data.total_pages}
      </div>
      <Button className={classes.btn} onClick={switchNextPage} disabled={isDisabledNextBtn}>
        &#5171;
      </Button>
      <Button className={classes.btn} onClick={switchLastPage} disabled={isDisabledNextBtn}>
        &#5171;&#5171;
      </Button>
    </div>
  );
};

export default Pagination;
