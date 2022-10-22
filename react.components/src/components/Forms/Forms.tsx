import Input from 'components/UI/Input/Input';
import React, { FC } from 'react';
import classes from './Forms.module.scss';
import SELECTOR_OPTIONS from '../../data/optionsForSelect.json';
import Button from 'components/UI/Button/Button';
import Select from 'components/UI/Select/Select';
import InputFile from 'components/UI/InputFile/InputFile';
import { InputSwitch } from 'components/UI/InputSwitch/InputSwitch';
import InputCheckbox from 'components/UI/InputCheckbox/InputCheckbox';
import { ErrorsForm, FormData, RegisterNames } from 'types/formTypes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import formValidator from 'utils/validator';

const DEFAULT_VALUE_COUNTRY = 'Country';

type PropsForms = {
  addData: (data: FormData) => void;
};

interface FormInputs {
  name: string;
  surname: string;
  birthday: string;
  country: string;
  avatar: FileList;
  gender: boolean;
  personalData: boolean;
}

export const Forms: FC<PropsForms> = ({ addData }): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm<FormInputs>();

  const createDataForCard = (data: FormInputs): void => {
    const dataCard: FormData = {
      name: data.name,
      surname: data.surname,
      birthday: data.birthday,
      country: data.country,
      avatar: URL.createObjectURL(data.avatar[0]),
      personalData: data.personalData,
      genderMale: data.gender,
    };
    addData(dataCard);
  };

  const onSubmit: SubmitHandler<FormInputs> = (data): void => {
    console.log(data);
    createDataForCard(data);
    reset();
  };

  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      data-testid="forms"
    >
      <Input
        label={RegisterNames.NAME}
        title="Name:"
        type="text"
        testid="inputName"
        {...register(RegisterNames.NAME, {
          required: ErrorsForm.REQUIRED_FIELD,
          pattern: {
            value: formValidator.requiredField,
            message: ErrorsForm.ALPHABET,
          },
          minLength: {
            value: 3,
            message: ErrorsForm.LENGTH,
          },
        })}
        error={errors?.name?.message}
      />

      <Input
        label={RegisterNames.SURNAME}
        title="Surname:"
        type="text"
        testid="inputSurname"
        {...register(RegisterNames.SURNAME, {
          required: ErrorsForm.REQUIRED_FIELD,
          pattern: {
            value: formValidator.requiredField,
            message: ErrorsForm.ALPHABET,
          },
          minLength: {
            value: 3,
            message: ErrorsForm.LENGTH,
          },
        })}
        error={errors?.surname?.message}
      />

      <Input
        label={RegisterNames.BIRTHDAY}
        title="Birthday:"
        type="date"
        testid="inputDate"
        {...register(RegisterNames.BIRTHDAY, {
          required: ErrorsForm.REQUIRED_FIELD,
          pattern: {
            value: formValidator.birthdayField,
            message: ErrorsForm.BIRTHDAY,
          },
        })}
        error={errors?.birthday?.message}
      />

      <Controller
        control={control}
        name={RegisterNames.COUNTRY}
        rules={{ required: ErrorsForm.COUNTRY }}
        render={({ field: { onChange, value } }) => (
          <Select
            label={RegisterNames.COUNTRY}
            title="Country:"
            defaultValue={DEFAULT_VALUE_COUNTRY}
            options={SELECTOR_OPTIONS}
            value={value}
            onChange={onChange}
            error={errors?.country?.message}
          />
        )}
      />

      <InputFile
        label={RegisterNames.AVATAR}
        title="Avatar:"
        accept="image/png, image/jpeg"
        {...register(RegisterNames.AVATAR, {
          required: ErrorsForm.FILE,
        })}
        error={errors?.avatar?.message}
      />

      <InputSwitch
        label={RegisterNames.GENDER}
        title="Male/Female:"
        {...register(RegisterNames.GENDER)}
      />

      <InputCheckbox
        label={RegisterNames.PERSONAL_DATA}
        title="Consent to data processing:"
        {...register(RegisterNames.PERSONAL_DATA, {
          required: ErrorsForm.REQUIRED_FIELD,
        })}
        error={errors?.personalData?.message}
      />

      <Button>Post</Button>
    </form>
  );
};

export default Forms;
