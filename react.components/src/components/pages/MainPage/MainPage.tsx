import TextWindow from 'components/TextWindow/TextWindow';
import Search from 'components/Search/Search';
import React, { useContext, useState } from 'react';
import classes from './MainPage.module.scss';
import Card from 'components/Card/Card';
import Loader from 'components/Loader/Loader';
import { MainContext } from 'context/MainProvider/MainProvider';

const MainPage = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data } = useContext(MainContext);

  const toggleLoader = (): void => {
    setIsLoading((value) => !value);
  };

  return (
    <div className={classes.container} data-testid="mainPage">
      <Search toggleLoader={toggleLoader} />

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
