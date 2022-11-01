import Input from 'components/UI/Input/Input';
import React, { FC, useEffect, useState } from 'react';
import classes from './Forms.module.scss';
import SELECTOR_OPTIONS from '../../data/optionsForSelect.json';
import Button from 'components/UI/Button/Button';
import Select from 'components/UI/Select/Select';
import InputFile from 'components/UI/InputFile/InputFile';
import { InputSwitch } from 'components/UI/InputSwitch/InputSwitch';
import InputCheckbox from 'components/UI/InputCheckbox/InputCheckbox';
import { ErrorsForm, FormData, RegisterName, TitleForm } from 'types/formTypes';
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

  useEffect(() => {
    if (isDirty && !isSubmitted) {
      setIsDisabled(false);
      setIsDone(false);
    } else if (isSubmitted && !isValid) {
      setIsDisabled(!isValid);
    } else if (isSubmitted && isValid) {
      setIsDisabled(!isValid);
    }
  }, [isDirty, isSubmitted, isValid]);

  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  const sendDataForCard = (data: FormInputs): void => {
    const dataCard: FormData = {
      ...data,
      avatar: data.avatar[0],
    };
    addData(dataCard);
  };

  const onSubmit: SubmitHandler<FormInputs> = (data): void => {
    sendDataForCard(data);
    setIsDisabled(true);
    setIsDone(true);
    setIsUploadedFile(false);
    setValue('genderMale', false);
    setValue('personalData', false);
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.id === RegisterName.AVATAR && isSubmitted) {
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
        label={RegisterName.NAME}
        title={TitleForm.NAME}
        type="text"
        testid="inputName"
        {...register(RegisterName.NAME, {
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
        label={RegisterName.SURNAME}
        title={TitleForm.SURNAME}
        type="text"
        testid="inputSurname"
        {...register(RegisterName.SURNAME, {
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
        label={RegisterName.BIRTHDAY}
        title={TitleForm.BIRTHDAY}
        type="date"
        testid="inputDate"
        {...register(RegisterName.BIRTHDAY, {
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
        name={RegisterName.COUNTRY}
        rules={{ required: ErrorsForm.COUNTRY }}
        render={({ field: { onChange, value } }) => (
          <Select
            label={RegisterName.COUNTRY}
            title={TitleForm.COUNTRY}
            defaultValue={DEFAULT_VALUE_COUNTRY}
            options={SELECTOR_OPTIONS}
            value={value}
            onChange={onChange}
            error={errors?.country?.message}
          />
        )}
      />

      <InputFile
        label={RegisterName.AVATAR}
        title={TitleForm.AVATAR}
        accept="image/png, image/jpeg"
        {...register(RegisterName.AVATAR, {
          required: ErrorsForm.FILE,
        })}
        ready={isUploadedFile}
        error={errors?.avatar?.message}
      />

      <InputSwitch
        label={RegisterName.GENDER}
        title={TitleForm.GENDER}
        {...register(RegisterName.GENDER)}
      />

      <InputCheckbox
        label={RegisterName.PERSONAL_DATA}
        title={TitleForm.PERSONAL_DATA}
        {...register(RegisterName.PERSONAL_DATA, {
          required: ErrorsForm.REQUIRED_FIELD,
        })}
        error={errors?.personalData?.message}
      />

      <Button disabled={isDisabled}>Post</Button>

      {isDone && (
        <div className={classes.done} data-testid="finalText">
          Done
          <span className={classes.doneImg} data-testid="finalImg"></span>
        </div>
      )}
    </form>
  );
};

export default Forms;
