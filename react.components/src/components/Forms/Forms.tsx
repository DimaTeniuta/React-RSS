import Input from 'components/UI/Input/Input';
import React, { FC, useEffect, useState } from 'react';
import classes from './Forms.module.scss';
import SELECTOR_OPTIONS from '../../data/optionsForSelect.json';
import Button from 'components/UI/Button/Button';
import Select from 'components/UI/Select/Select';
import InputFile from 'components/UI/InputFile/InputFile';
import { InputSwitch } from 'components/UI/InputSwitch/InputSwitch';
import InputCheckbox from 'components/UI/InputCheckbox/InputCheckbox';
import { ErrorsForm, FormData, RegisterNames } from 'types/formTypes';
import { Controller, SubmitHandler, useForm, useFormState } from 'react-hook-form';
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
  genderMale: boolean;
  personalData: boolean;
}

export const Forms: FC<PropsForms> = ({ addData }): JSX.Element => {
  const {
    register,
    formState: { errors, isDirty, isSubmitted, isValid, isSubmitSuccessful },
    handleSubmit,
    control,
    reset,
    setValue,
  } = useForm<FormInputs>();

  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isUploadedFile, setIsUploadedFile] = useState<boolean>(false);

  const checkConditionsForSubmit = (): void => {
    if (isDirty && !isSubmitted) {
      setIsDisabled(false);
      setIsDone(false);
    } else if (isSubmitted && !isValid) {
      setIsDisabled(true);
    } else if (isSubmitted && isValid) {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    checkConditionsForSubmit();
  }, [isDirty, isSubmitted, isValid]);

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful]);

  const createDataForCard = (data: FormInputs): void => {
    const dataCard: FormData = {
      ...data,
      avatar: data.avatar[0],
    };
    addData(dataCard);
  };

  const onSubmit: SubmitHandler<FormInputs> = (data): void => {
    createDataForCard(data);
    setIsDisabled(true);
    setIsDone(true);
    setIsUploadedFile(false);
    setValue('genderMale', false);
    setValue('personalData', false);
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.id === 'avatar' && isSubmitted) {
      target.files![0] ? setIsUploadedFile(true) : setIsUploadedFile(false);
    }
  };

  return (
    <form
      className={classes.container}
      onSubmit={handleSubmit(onSubmit)}
      onChange={handleChange}
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
        ready={isUploadedFile.toString()}
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

      <Button disabled={isDisabled}>Post</Button>

      {isDone && (
        <div className={classes.done} data-testid="final-text">
          Done
          <span className={classes.doneImg} data-testid="final-img"></span>
        </div>
      )}
    </form>
  );
};

export default Forms;
