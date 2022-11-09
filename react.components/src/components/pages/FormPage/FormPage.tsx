import FormCard from 'components/FormCard/FormCard';
import Forms from 'components/Form/Form';
import { MainContext } from 'context/MainProvider/MainProvider';
import React, { useContext } from 'react';
import classes from './FormPage.module.scss';

const FormPage = (): JSX.Element => {
  const {
    state: { formData },
  } = useContext(MainContext);

  return (
    <div className={classes.container} data-testid="formPage">
      <Forms />

      <div className={classes.wrapCards}>
        {formData && formData.map((el, i) => <FormCard key={i} data={el} />)}
      </div>
    </div>
  );
};

export default FormPage;
