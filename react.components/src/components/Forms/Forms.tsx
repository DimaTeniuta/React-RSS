import Input from 'components/UI/Input/Input';
import React, { useContext, useEffect, useState } from 'react';
import classes from './Forms.module.scss';
import SELECTOR_OPTIONS from '../../data/optionsForSelect.json';
import Button from 'components/UI/Button/Button';
import Select from 'components/UI/Select/Select';
import InputFile from 'components/UI/InputFile/InputFile';
import { InputSwitch } from 'components/UI/InputSwitch/InputSwitch';
import InputCheckbox from 'components/UI/InputCheckbox/InputCheckbox';
import { ErrorsForm, FormData, RegisterName, TitleForm } from 'types/formTypes';
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import formValidator from 'utils/validator';
import { defaultFileName, FormContext, initialFormFile } from 'context/FormProvider/FormProvider';
import { FormReducer } from 'types/formProviderTypes';

const DEFAULT_VALUE_COUNTRY = 'Country';

export interface FormInputs {
  name: string;
  surname: string;
  birthday: string;
  country: string;
  avatar: FileList;
  genderMale: boolean;
  personalData: boolean;
}

export const Forms = (): JSX.Element => {
  const {
    register,
    formState: { errors, isDirty, isSubmitted, isValid, isSubmitSuccessful },
    handleSubmit,
    reset,
    setValue,
    setError,
  } = useFormContext();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isUploadedFile, setIsUploadedFile] = useState<boolean>(false);
  const [isValidateFile, setIsValidateFile] = useState<boolean>(true);
  const { file, dispatchFormFile, dispatchFormData } = useContext(FormContext);

  useEffect(() => {
    if (isDirty && !isSubmitted) {
      setIsDisabled(false);
      setIsDone(false);
    } else if (isSubmitted && !isValid) {
      if (Object.keys(errors).length) {
        setIsDisabled(true);
      }
    } else if (isSubmitted && isValid) {
      setIsDisabled(false);
    }
  }, [errors, isDirty, isSubmitted, isValid]);

  useEffect(() => {
    if (isSubmitted && checkFile()) setFileValues(true);
  }, [isDisabled]);

  useEffect(() => {
    checkFile() && isSubmitted ? setFileValues(true) : setFileValues(false);
    if (!Object.keys(errors).length && isSubmitted) {
      setIsDisabled(false);
    }
  }, []);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsUploadedFile(false);
    }
  }, [isSubmitSuccessful, reset]);

  const sendDataForCard = (data: FieldValues): void => {
    const dataCard = {
      ...data,
      avatar: data.avatar[0],
    };
    dispatchFormData!({ type: FormReducer.DATA, payload: dataCard as FormData });
  };

  const setFileInContext = (file: File): void => {
    dispatchFormFile!({ type: FormReducer.FILE, payload: file });
  };

  const checkFile = (): boolean => {
    if (file.name.split('.')[0] === defaultFileName) return false;
    return true;
  };

  const setFileValues = (value: boolean): void => {
    setIsUploadedFile(value);
    setIsValidateFile(!value);
  };

  const onClick = (): void => {
    checkFile() ? setIsValidateFile(false) : setIsValidateFile(true);
  };

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.id === RegisterName.AVATAR) {
      setIsValidateFile(true);
      target?.files![0] ? setFileInContext(target.files[0]) : setFileInContext(initialFormFile);
    }

    if (target.id === RegisterName.AVATAR && isSubmitted) {
      if (target.files![0]) {
        setFileValues(true);
      } else {
        setFileValues(false);
        setError(RegisterName.AVATAR, { type: 'required', message: ErrorsForm.FILE });
      }
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data): void => {
    sendDataForCard(data);
    setIsDisabled(true);
    setIsDone(true);
    setValue('genderMale', false);
    setValue('personalData', false);
    setFileInContext(initialFormFile);
    setIsValidateFile(true);
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
        error={errors?.name?.message as string}
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
        error={errors?.surname?.message as string}
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
        error={errors?.birthday?.message as string}
      />

      <Select
        label={RegisterName.COUNTRY}
        title={TitleForm.COUNTRY}
        defaultValue={DEFAULT_VALUE_COUNTRY}
        options={SELECTOR_OPTIONS}
        {...register(RegisterName.COUNTRY, {
          pattern: {
            value: formValidator.countryField,
            message: ErrorsForm.COUNTRY,
          },
        })}
        error={errors?.country?.message as string}
      />

      <InputFile
        label={RegisterName.AVATAR}
        title={TitleForm.AVATAR}
        accept="image/png, image/jpeg"
        {...register(RegisterName.AVATAR, {
          required: isValidateFile && ErrorsForm.FILE,
        })}
        ready={isUploadedFile.toString()}
        error={errors?.avatar?.message as string}
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
        error={errors?.personalData?.message as string}
      />

      <Button disabled={isDisabled} onClick={onClick}>
        Post
      </Button>

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
