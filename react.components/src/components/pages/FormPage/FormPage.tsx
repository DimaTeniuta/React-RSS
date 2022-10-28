import FormCard from 'components/FormCard/FormCard';
import Forms from 'components/Forms/Forms';
import { FormContext } from 'context/FormProvider/FormProvider';
import React, { useContext } from 'react';
import classes from './FormPage.module.scss';

const FormPage = (): JSX.Element => {
  const { data } = useContext(FormContext);

  return (
    <div className={classes.container} data-testid="formPage">
      <Forms />

      <div className={classes.wrapCards}>
        {data && data.map((el, i) => <FormCard key={i} data={el} />)}
      </div>
    </div>
  );
};

export default FormPage;
