import Input from 'components/UI/Input/Input';
import React, { FC } from 'react';
import classes from './Forms.module.scss';
import SELECTOR_OPTIONS from '../../data/optionsForSelect.json';
import Button from 'components/UI/Button/Button';
import Select from 'components/UI/Select/Select';
import InputFile from 'components/UI/InputFile/InputFile';
import { InputSwitch } from 'components/UI/InputSwitch/InputSwitch';
import InputCheckbox from 'components/UI/InputCheckbox/InputCheckbox';
import { FormData } from 'types/formTypes';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

const DEFAULT_VALUE_COUNTRY = 'Country';

enum ErrorsForm {
  REQUIRED_FIELD = 'This field is required',
  LENGTH = 'The text must be longer than 3 characters',
  ALPHABET = 'The text should contain only the letters a-z, A-Z',
  BIRTHDAY = 'The date must be in the format: DD-MM-YYYY',
  COUNTRY = 'Chose country',
  FILE = 'Upload an image in JPG or PNG format',
}

type PropsForms = {
  addData: (data: FormData) => void;
};

export interface FormInputs {
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
    const obj: FormData = {
      name: data.name,
      surname: data.surname,
      birthday: data.birthday,
      country: data.country,
      avatar: URL.createObjectURL(data.avatar[0]),
      personalData: data.personalData,
      genderMale: data.gender,
    };
    addData(obj);
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
        label="firstName"
        title="Name:"
        type="text"
        testid="inputName"
        {...register('name', {
          required: ErrorsForm.REQUIRED_FIELD,
          pattern: {
            value: /^[a-zA-Z]*$/g,
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
        label="surname"
        title="Surname:"
        type="text"
        testid="inputSurname"
        {...register('surname', {
          required: ErrorsForm.REQUIRED_FIELD,
          pattern: {
            value: /^[a-zA-Z]*$/g,
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
        label="birthday"
        title="Birthday:"
        type="date"
        testid="inputDate"
        {...register('birthday', {
          required: ErrorsForm.REQUIRED_FIELD,
          pattern: {
            value: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g,
            message: ErrorsForm.BIRTHDAY,
          },
        })}
        error={errors?.birthday?.message}
      />

      <Controller
        control={control}
        name="country"
        rules={{ required: ErrorsForm.COUNTRY }}
        render={({ field: { onChange, value } }) => (
          <Select
            label="country"
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
        label="avatar"
        title="Avatar:"
        accept="image/png, image/jpeg"
        {...register('avatar', {
          required: ErrorsForm.FILE,
        })}
        error={errors?.avatar?.message}
      />

      <InputSwitch label="switch" title="Male/Female:" {...register('gender')} />

      <InputCheckbox
        label="agree"
        title="Consent to data processing:"
        {...register('personalData', {
          required: ErrorsForm.REQUIRED_FIELD,
        })}
        error={errors?.personalData?.message}
      />

      <Button>Post</Button>
    </form>
  );
};

export default Forms;
