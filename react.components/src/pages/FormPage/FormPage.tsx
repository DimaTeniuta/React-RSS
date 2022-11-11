import FormCard from 'components/FormCard/FormCard';
import Form from 'components/Form/Form';
import { useAppSelector } from 'hooks/redux';
import React from 'react';
import classes from './FormPage.module.scss';

const FormPage = (): JSX.Element => {
  const { data } = useAppSelector((state) => state.formReducer);

  return (
    <div className={classes.container} data-testid="formPage">
      <Form />

      <div className={classes.wrapCards}>
        {data && data.map((el, i) => <FormCard key={i} data={el} />)}
      </div>
    </div>
  );
};

export default FormPage;
