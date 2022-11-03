export interface FormData {
  name: string;
  surname: string;
  birthday: string;
  country: string;
  personalData: boolean;
  avatar: string;
  genderMale: boolean;
}

export interface FormInputs {
  name: string;
  surname: string;
  birthday: string;
  country: string;
  avatar?: FileList;
  genderMale: boolean;
  personalData: boolean;
}

export interface SelectData {
  value: string | number;
  name: string | number;
}

export enum ErrorsForm {
  REQUIRED_FIELD = 'This field is required',
  LENGTH = 'The text must be longer than 3 characters',
  ALPHABET = 'The text should contain only the letters a-z, A-Z',
  BIRTHDAY = 'The date must be in the format: DD-MM-YYYY',
  COUNTRY = 'Chose country',
  FILE = 'Upload an image in JPG or PNG format',
}

export enum RegisterName {
  NAME = 'name',
  SURNAME = 'surname',
  BIRTHDAY = 'birthday',
  COUNTRY = 'country',
  AVATAR = 'avatar',
  GENDER = 'genderMale',
  PERSONAL_DATA = 'personalData',
}

export enum TitleForm {
  NAME = 'Name:',
  SURNAME = 'Surname:',
  BIRTHDAY = 'Birthday:',
  COUNTRY = 'Country:',
  AVATAR = 'Avatar:',
  GENDER = 'Male/Female:',
  PERSONAL_DATA = 'Consent to data processing:',
}
