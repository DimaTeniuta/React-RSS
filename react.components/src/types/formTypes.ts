export interface FormData {
  name: string;
  surname: string;
  birthday: string;
  country: string;
  avatar: File;
  personalData: boolean;
  genderMale: boolean;
}

export interface SelectData {
  value: string;
  name: string;
}

export enum ErrorsForm {
  REQUIRED_FIELD = 'This field is required',
  LENGTH = 'The text must be longer than 3 characters',
  ALPHABET = 'The text should contain only the letters a-z, A-Z',
  BIRTHDAY = 'The date must be in the format: DD-MM-YYYY',
  COUNTRY = 'Chose country',
  FILE = 'Upload an image in JPG or PNG format',
}

export enum RegisterNames {
  NAME = 'name',
  SURNAME = 'surname',
  BIRTHDAY = 'birthday',
  COUNTRY = 'country',
  AVATAR = 'avatar',
  GENDER = 'genderMale',
  PERSONAL_DATA = 'personalData',
}
