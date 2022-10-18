import FormCard from 'components/FormCard/FormCard';
import Forms from 'components/Forms/Forms';
import React, { useState } from 'react';
import { FormData } from 'types/formTypes';
import classes from './FormPage.module.scss';

const FormPage = (): JSX.Element => {
  const [data, setData] = useState<FormData[]>([]);
  const addData = (data: FormData): void => {
    setData((prevData) => [...prevData, data]);
  };

  return (
    <div className={classes.container} data-testid="form-page">
      <Forms addData={addData} />
      <div className={classes.wrapCards}>
        {data.map((el, i) => (
          <FormCard key={i} data={el} />
        ))}
      </div>
    </div>
  );
};

export default FormPage;
