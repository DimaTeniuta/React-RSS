import TextWindow from 'components/TextWindow/TextWindow';
import Search from 'components/Search/Search';
import React, { useState } from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './MainPage.module.scss';
import Card from 'components/Card/Card';
import Loader from 'components/Loader/Loader';

const MainPage = (): JSX.Element => {
  const [data, setData] = useState<ResultsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setDataCards = (newData: ResultsData[]): void => {
    setData(newData);
    setIsLoading(false);
  };

  const turnOnLoader = (): void => {
    setIsLoading(true);
  };

  return (
    <div className={classes.container} data-testid="mainPage">
      <Search setData={setDataCards} showLoader={turnOnLoader} />

      <div className={classes.wrapCards}>
        {isLoading ? (
          <Loader />
        ) : data.length ? (
          data.map((el) => <Card key={el.id} data={el} />)
        ) : (
          <TextWindow title="Not Found">Try entering another query</TextWindow>
        )}
      </div>
    </div>
  );
};

export default MainPage;
