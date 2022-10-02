import { Input } from 'components/UI/Input/Input';
import React, { Component } from 'react';
import classes from './Forms.module.scss';
import SELECT_DATA from '../../data/optionsForSelect.json';
import { SelectData } from 'types/generalTypes';
import Button from 'components/UI/Button/Button';
import { Select } from 'components/UI/Select/Select';

interface StateForms {
  selectData: SelectData[];
  isDisabled: boolean;
  isFirstInput: boolean;
  isValid: boolean;
  nameRef: React.RefObject<HTMLInputElement>;
  surnameRef: React.RefObject<HTMLInputElement>;
  birthdayRef: React.RefObject<HTMLInputElement>;
  countryRef: React.RefObject<HTMLSelectElement>;
  personalDataRef: React.RefObject<HTMLInputElement>;
  nameError: string;
  surnameError: string;
  birthdayError: string;
  countryError: string;
  personaDataError: string;
}

type PropsForms = object;

export default class Forms extends Component<PropsForms, StateForms> {
  constructor(props: PropsForms) {
    super(props);
    this.state = {
      selectData: SELECT_DATA,
      isFirstInput: false,
      isDisabled: true,
      isValid: false,
      nameRef: React.createRef(),
      surnameRef: React.createRef(),
      birthdayRef: React.createRef(),
      countryRef: React.createRef(),
      personalDataRef: React.createRef(),
      nameError: '',
      surnameError: '',
      birthdayError: '',
      countryError: '',
      personaDataError: '',
    };
  }

  firstInput = (): void => {
    if (this.state.nameRef || this.state.surnameRef || this.state.birthdayRef) {
      this.setState({ isDisabled: false, isFirstInput: true });
    }
  };

  validationName = (): boolean => {
    const name = this.state.nameRef.current?.value;
    let isPattern;
    if (name) {
      isPattern = name.match(/^[a-zA-Z]*$/g);
    }
    if (!isPattern) {
      this.setState({ nameError: 'The name should contain only the letters a-z, A-Z' });
      return false;
    } else if (!name) {
      this.setState({ nameError: 'The name must be longer than 3 characters' });
      return false;
    } else if (name.length < 3) {
      this.setState({ nameError: 'The name must be longer than 3 characters' });
      return false;
    } else {
      this.setState({ nameError: '' });
      return true;
    }
  };

  validationSurname = (): boolean => {
    const surname = this.state.surnameRef.current?.value;
    let isPattern;
    if (surname) {
      isPattern = surname.match(/^[a-zA-Z]*$/g);
    }
    if (!isPattern) {
      this.setState({ surnameError: 'The name should contain only the letters a-z, A-Z' });
      return false;
    } else if (!surname) {
      this.setState({ surnameError: 'The surname must be longer than 3 characters' });
      return false;
    } else if (surname.length < 3) {
      this.setState({ surnameError: 'The surname must be longer than 3 characters' });
      return false;
    } else {
      this.setState({ surnameError: '' });
      return true;
    }
  };

  validationBirthday = (): boolean => {
    const birthday = this.state.birthdayRef.current?.value;
    let isPattern;
    if (birthday) {
      isPattern = birthday.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g);
    }

    if (!isPattern) {
      this.setState({ birthdayError: 'The date must be in the format: DD-MM-YYYY' });
      return false;
    } else {
      this.setState({ birthdayError: '' });
      return true;
    }
  };

  validationCountry = (): boolean => {
    const country = this.state.countryRef.current?.value;
    let isPattern = false;
    if (country !== 'Country') {
      isPattern = true;
    }

    if (!isPattern) {
      this.setState({ countryError: 'Chose country' });
      return false;
    } else {
      this.setState({ countryError: '' });
      return true;
    }
  };

  validationPersonalData = (): boolean => {
    const data = this.state.personalDataRef.current?.checked;
    let isPattern = false;
    if (data) {
      isPattern = true;
    }

    if (!isPattern) {
      this.setState({ personaDataError: 'This field is required' });
      return false;
    } else {
      this.setState({ personaDataError: '' });
      return true;
    }
  };

  validationAfterWrongPost = (): void => {
    if (this.state.isValid) {
      const name = this.validationName();
      const surname = this.validationSurname();
      const birthday = this.validationBirthday();
      const country = this.validationCountry();
      const personalData = this.validationPersonalData();

      if (name && surname && birthday && country && personalData) {
        this.setState({ isDisabled: false });
      }
    }
  };

  handleOnChange = (): void => {
    if (!this.state.isFirstInput) {
      this.firstInput();
    }
    this.validationAfterWrongPost();
  };

  clearForm = (): void => {
    console.log('success');
    this.setState({ isFirstInput: false, isDisabled: true, isValid: false });
    this.state.nameRef.current!.value = '';
    this.state.surnameRef.current!.value = '';
    this.state.birthdayRef.current!.value = '';
    this.state.countryRef.current!.value = 'Country';
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log('submit');
    this.setState({ isDisabled: true, isValid: true });
    const isValidName = this.validationName();
    const isValidSurname = this.validationSurname();
    const isValidBirthday = this.validationBirthday();
    const isValidCountry = this.validationCountry();
    const personalData = this.validationPersonalData();

    if (isValidName && isValidSurname && isValidBirthday && isValidCountry && personalData) {
      this.clearForm();
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={classes.container} noValidate>
        <Input
          type="text"
          label="firstName"
          title="Name:"
          className={classes.inputText}
          onChange={this.handleOnChange}
          ref={this.state.nameRef}
          error={this.state.nameError}
        />

        <Input
          type="text"
          label="surname"
          title="Surname:"
          className={classes.inputText}
          onChange={this.handleOnChange}
          ref={this.state.surnameRef}
          error={this.state.surnameError}
        />

        <Input
          type="date"
          label="birthday"
          title="Birthday:"
          className={classes.inputData}
          onChange={this.handleOnChange}
          ref={this.state.birthdayRef}
          error={this.state.birthdayError}
        />

        <Select
          defaultValue="Country"
          label="country"
          title="Country:"
          options={this.state.selectData}
          className={classes.select}
          onChange={this.handleOnChange}
          ref={this.state.countryRef}
          error={this.state.countryError}
        />

        <Input
          type="checkbox"
          className={classes.inputCheckbox}
          labelclass={classes.checkboxWrap}
          label="agree"
          title="Consent to data processing:"
          onChange={this.handleOnChange}
          ref={this.state.personalDataRef}
          error={this.state.personaDataError}
          errorclass={classes.checkboxError}
        />

        <Button className={classes.standardBtn} disabled={this.state.isDisabled}>
          Post
        </Button>
      </form>
    );
  }
}
