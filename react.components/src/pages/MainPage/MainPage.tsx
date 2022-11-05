import TextWindow from 'components/TextWindow/TextWindow';
import Search from 'components/Search/Search';
import React from 'react';
import classes from './MainPage.module.scss';
import Card from 'components/Card/Card';
import Loader from 'components/Loader/Loader';
import Pagination from 'components/Pagination/Pagination';
import { useAppSelector } from 'hooks/redux';

const MainPage = (): JSX.Element => {
  const { data, isLoading } = useAppSelector((state) => state.mainReducer);

  return (
    <div className={classes.container} data-testid="mainPage">
      <Search />

      {data.results.length > 0 && <Pagination />}

      <div className={classes.wrapCards}>
        {isLoading ? (
          <Loader />
        ) : data.results.length ? (
          data.results.map((el) => <Card key={el.id} data={el} />)
        ) : (
          <TextWindow title="Not Found">Try entering another query</TextWindow>
        )}
      </div>
    </div>
  );
};

export default MainPage;
