export const validateTextInput = (value: string | undefined): string => {
  let isPattern;
  if (value) {
    isPattern = value.match(/^[a-zA-Z]*$/g);
  }

  if (!value) {
    return 'The text must be longer than 3 characters';
  } else if (!isPattern) {
    return 'The text should contain only the letters a-z, A-Z';
  } else if (value.length < 3) {
    return 'The text must be longer than 3 characters';
  } else {
    return '';
  }
};

export const validateDateInput = (value: string | undefined): string => {
  let isPattern;
  if (value) {
    isPattern = value.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g);
  }

  if (!isPattern) {
    return 'The date must be in the format: DD-MM-YYYY';
  } else {
    return '';
  }
};

export const validateSelectInput = (value: string | undefined, defaultValue: string): string => {
  if (value === defaultValue) {
    return 'Chose country';
  } else {
    return '';
  }
};

export const validateInputCheckbox = (value: boolean | undefined): string => {
  if (!value) {
    return 'This field is required';
  } else {
    return '';
  }
};

export const validateInputFile = (file: FileList | null | undefined): string => {
  let isPattern;
  if (file && file.length) {
    isPattern = file[0].name.match(/.*\.(jpg|JPG|png|PNG)$/);
  }

  if (file && !file.length) {
    return 'Upload an image in JPG or PNG format';
  } else if (!isPattern) {
    return 'The image must be in JPG or PNG format';
  } else {
    return '';
  }
};
