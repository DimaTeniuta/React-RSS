import TextWindow from 'components/TextWindow/TextWindow';
import Search from 'components/Search/Search';
import React, { useState } from 'react';
import { ResultsData } from 'types/generalTypes';
import classes from './MainPage.module.scss';
import Card from 'components/Card/Card';
import Loader from 'components/Loader/Loader';
import { CardModalWindow } from 'components/CardModalWindow/CardModalWindow';

const MainPage = (): JSX.Element => {
  const [data, setData] = useState<ResultsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isActiveModalWindow, setIsActiveModalWindow] = useState<boolean>(false);
  const [modalWindowData, setModalWindowData] = useState<ResultsData>({});

  const setCards = (newData: ResultsData[]): void => {
    setData(newData);
    setIsLoading(false);
  };

  const turnOnLoader = (): void => {
    setIsLoading(true);
  };

  const toggleModalWindow = (): void => {
    setIsActiveModalWindow(!isActiveModalWindow);
  };

  const setDataModalWindow = (data: ResultsData): void => {
    toggleModalWindow();
    setModalWindowData(data);
  };

  return (
    <div className={classes.container} data-testid="mainPage">
      <Search setData={setCards} showLoader={turnOnLoader} />

      <div className={classes.wrapCards}>
        {isActiveModalWindow && (
          <CardModalWindow onClick={toggleModalWindow} data={modalWindowData} />
        )}

        {isLoading ? (
          <Loader />
        ) : data.length ? (
          data.map((el) => <Card key={el.id} data={el} onClick={setDataModalWindow} />)
        ) : (
          <TextWindow title="Not Found">Try entering another query</TextWindow>
        )}
      </div>
    </div>
  );
};

export default MainPage;
