const formValidator = {
  requiredField: /^[a-zA-Z]*$/g,
  birthdayField: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g,
  countryField: /^(Belarus|Russia|Ukraine)$/,
};

export default formValidator;
