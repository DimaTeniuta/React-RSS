import Input from 'components/UI/Input/Input';
import React, { FC, useEffect, useRef, useState } from 'react';
import classes from './Forms.module.scss';
import SELECTOR_OPTIONS from '../../data/optionsForSelect.json';
import Button from 'components/UI/Button/Button';
import Select from 'components/UI/Select/Select';
import InputFile from 'components/UI/InputFile/InputFile';
import { InputSwitch } from 'components/UI/InputSwitch/InputSwitch';
import InputCheckbox from 'components/UI/InputCheckbox/InputCheckbox';
import { FormData } from 'types/formTypes';
import {
  validateDateInput,
  validateInputCheckbox,
  validateInputFile,
  validateSelectInput,
  validateTextInput,
} from 'utils/validator';
import { SubmitHandler, useForm } from 'react-hook-form';

const DEFAULT_VALUE_COUNTRY = 'Country';

enum ErrorFieldNames {
  NAME = 'nameError',
  SURNAME = 'surnameError',
  BIRTHDAY = 'birthdayError',
  COUNTRY = 'countryError',
  PERSONAL_DATA = 'personaDataError',
  AVATAR = 'avatarError',
}

enum ErrorsForm {
  REQUIRED_FIELD = 'This field is required',
  LENGTH = 'The text must be longer than 3 characters',
  ALPHABET = 'The text should contain only the letters a-z, A-Z',
  BIRTHDAY = 'The date must be in the format: DD-MM-YYYY',
}

type PropsForms = {
  addData: (data: FormData) => void;
};

interface FormInputs {
  firstName: string;
  surname: string;
  birthday: string;
}

export const Forms: FC<PropsForms> = (): JSX.Element => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data): void => {
    console.log(data);
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
        {...register('firstName', {
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
        error={errors?.firstName?.message}
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

      <Button>Post</Button>
    </form>
  );
};

// interface Errors {
//   nameError: string;
//   surnameError: string;
//   birthdayError: string;
//   countryError: string;
//   avatarError: string;
//   personaDataError: string;
// }

// const Forms: FC<PropsForms> = ({ addData }): JSX.Element => {
//   const [isFirstInput, setIsFirstInput] = useState<boolean>(false);
//   const [isDisabled, setIsDisabled] = useState<boolean>(true);
//   const [isValid, setIsValid] = useState<boolean>(false);
//   const [isDone, setIsDone] = useState<boolean>(false);
//   const [isValidAvatar, setIsValidAvatar] = useState<boolean>(false);
//   const [errors, setErrors] = useState<Errors>({
//     nameError: '',
//     surnameError: '',
//     birthdayError: '',
//     countryError: '',
//     avatarError: '',
//     personaDataError: '',
//   });
//   const nameRef = useRef<HTMLInputElement>(null);
//   const surnameRef = useRef<HTMLInputElement>(null);
//   const birthdayRef = useRef<HTMLInputElement>(null);
//   const countryRef = useRef<HTMLSelectElement>(null);
//   const avatarRef = useRef<HTMLInputElement>(null);
//   const personalDataRef = useRef<HTMLInputElement>(null);
//   const switchRef = useRef<HTMLInputElement>(null);

//   const firstInput = (): void => {
//     if (
//       nameRef.current?.value ||
//       surnameRef.current?.value ||
//       birthdayRef.current?.value ||
//       countryRef.current?.value !== DEFAULT_VALUE_COUNTRY ||
//       avatarRef.current?.value ||
//       switchRef.current?.checked ||
//       personalDataRef.current?.checked
//     ) {
//       setIsDisabled(false);
//       setIsFirstInput(true);
//       setIsDone(false);
//     }
//   };

//   const onClickAvatar = (): void => {
//     avatarRef.current?.click();
//   };

//   const onClickSwitch = (): void => {
//     switchRef.current?.click();
//   };

//   const onClickPersonalData = (): void => {
//     personalDataRef.current!.click();
//   };

//   const validateForm = (): boolean => {
//     const errors: Errors = {
//       [ErrorFieldNames.NAME]: validateTextInput(nameRef.current?.value),
//       [ErrorFieldNames.SURNAME]: validateTextInput(surnameRef.current?.value),
//       [ErrorFieldNames.BIRTHDAY]: validateDateInput(birthdayRef.current?.value),
//       [ErrorFieldNames.COUNTRY]: validateSelectInput(
//         countryRef.current?.value,
//         DEFAULT_VALUE_COUNTRY
//       ),
//       [ErrorFieldNames.PERSONAL_DATA]: validateInputCheckbox(personalDataRef.current?.checked),
//       [ErrorFieldNames.AVATAR]: validateInputFile(avatarRef.current?.files),
//     };
//     setErrors(errors);
//     errors[ErrorFieldNames.AVATAR] ? setIsValidAvatar(false) : setIsValidAvatar(true);

//     return Object.entries(errors).every((item) => !item[1]);
//   };

//   const validateAfterWrongPost = (): void => {
//     const isValidForm = validateForm();
//     if (isValidForm) {
//       setIsDisabled(false);
//     }
//   };

//   const handleOnChange = () => {
//     if (!isFirstInput) {
//       firstInput();
//     }

//     if (isValid) {
//       validateAfterWrongPost();
//     }
//   };

//   const clearForm = (event: React.FormEvent<HTMLFormElement>): void => {
//     setIsFirstInput(false);
//     setIsDisabled(true);
//     setIsValid(false);
//     setIsValidAvatar(false);
//     const form = event?.target as HTMLFormElement;
//     form.reset();
//     switchRef.current!.checked = false;
//     personalDataRef.current!.checked = false;
//   };

//   const postData = () => {
//     const cardData: FormData = {
//       name: nameRef.current!.value,
//       surname: surnameRef.current!.value,
//       birthday: birthdayRef.current!.value,
//       country: countryRef.current!.value,
//       avatar: avatarRef.current!.files![0],
//       personalData: personalDataRef.current!.checked,
//       genderMale: switchRef.current!.checked,
//     };
//     addData(cardData);
//   };

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
//     event.preventDefault();
//     setIsDisabled(true);
//     setIsValid(true);
//     const isValidForm = validateForm();
//     if (isValidForm) {
//       postData();
//       setIsDone(true);
//       clearForm(event);
//     }
//   };

//   return (
//     <form
//       className={classes.container}
//       onSubmit={handleSubmit}
//       onChange={handleOnChange}
//       noValidate
//       data-testid="forms"
//     >
//       <Input
//         label="firstName"
//         title="Name:"
//         type="text"
//         ref={nameRef}
//         testid="inputName"
//         error={errors.nameError}
//       />

//       <Input
//         label="surname"
//         title="Surname:"
//         type="text"
//         ref={surnameRef}
//         testid="inputSurname"
//         error={errors.surnameError}
//       />

//       <Input
//         label="birthday"
//         title="Birthday:"
//         type="date"
//         ref={birthdayRef}
//         testid="inputDate"
//         error={errors.birthdayError}
//       />

//       <Select
//         label="country"
//         title="Country:"
//         defaultValue={DEFAULT_VALUE_COUNTRY}
//         options={SELECTOR_OPTIONS}
//         ref={countryRef}
//         error={errors.countryError}
//       />

//       <InputFile
//         label="avatar"
//         title="Avatar:"
//         ready={isValidAvatar.toString()}
//         ref={avatarRef}
//         onClick={onClickAvatar}
//         error={errors.avatarError}
//       />

//       <InputSwitch label="switch" title="Male/Female:" onClick={onClickSwitch} ref={switchRef} />

//       <InputCheckbox
//         label="agree"
//         title="Consent to data processing:"
//         onClick={onClickPersonalData}
//         ref={personalDataRef}
//         error={errors.personaDataError}
//       />

//       <Button disabled={isDisabled}>Post</Button>

//       {isDone && (
//         <div className={classes.done} data-testid="final-text">
//           Done
//           <span className={classes.doneImg} data-testid="final-img"></span>
//         </div>
//       )}
//     </form>
//   );
// };

export default Forms;
