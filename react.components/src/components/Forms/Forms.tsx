import { Input } from 'components/UI/Input/Input';
import React, { Component } from 'react';
import classes from './Forms.module.scss';
import SELECTOR_OPTIONS from '../../data/optionsForSelect.json';
import Button from 'components/UI/Button/Button';
import { Select } from 'components/UI/Select/Select';
import { InputFile } from 'components/UI/InputFile/InputFile';
import { InputSwitch } from 'components/UI/InputSwitch/InputSwitch';
import { InputCheckbox } from 'components/UI/InputCheckbox/InputCheckbox';
import { FormData } from 'types/formTypes';

const DEFAULT_VALUE_COUNTRY = 'Country';

interface StateForms {
  isDisabled: boolean;
  isFirstInput: boolean;
  isValid: boolean;
  isDone: boolean;
  validAvatar: string;
  errors: {
    nameError: string;
    surnameError: string;
    birthdayError: string;
    countryError: string;
    avatarError: string;
    personaDataError: string;
  };
}

type PropsForms = {
  getData: (data: FormData) => void;
};

export default class Forms extends Component<PropsForms, StateForms> {
  private nameRef: React.RefObject<HTMLInputElement>;
  private surnameRef: React.RefObject<HTMLInputElement>;
  private birthdayRef: React.RefObject<HTMLInputElement>;
  private countryRef: React.RefObject<HTMLSelectElement>;
  private avatarRef: React.RefObject<HTMLInputElement>;
  private personalDataRef: React.RefObject<HTMLInputElement>;
  private switchRef: React.RefObject<HTMLInputElement>;

  constructor(props: PropsForms) {
    super(props);
    this.state = {
      isFirstInput: false,
      isDisabled: true,
      isValid: false,
      isDone: false,
      validAvatar: '',
      errors: {
        nameError: '',
        surnameError: '',
        birthdayError: '',
        countryError: '',
        avatarError: '',
        personaDataError: '',
      },
    };

    this.nameRef = React.createRef();
    this.surnameRef = React.createRef();
    this.birthdayRef = React.createRef();
    this.countryRef = React.createRef();
    this.avatarRef = React.createRef();
    this.personalDataRef = React.createRef();
    this.switchRef = React.createRef();
  }

  firstInput = (): void => {
    if (
      this.nameRef.current?.value ||
      this.surnameRef.current?.value ||
      this.birthdayRef.current?.value ||
      this.countryRef.current?.value !== DEFAULT_VALUE_COUNTRY ||
      this.avatarRef.current?.value ||
      this.switchRef.current?.checked ||
      this.personalDataRef.current?.checked
    ) {
      this.setState({ isDisabled: false, isFirstInput: true });
      this.setState({ isDone: false });
    }
  };

  validationName = (): boolean => {
    const name = this.nameRef.current?.value;
    let isPattern;
    if (name) {
      isPattern = name.match(/^[a-zA-Z]*$/g);
    }

    if (!name) {
      const err = this.state.errors;
      err.nameError = 'The name must be longer than 3 characters';
      this.setState({ errors: err });
      return false;
    } else if (!isPattern) {
      const err = this.state.errors;
      err.nameError = 'The name should contain only the letters a-z, A-Z';
      this.setState({ errors: err });
      return false;
    } else if (name.length < 3) {
      const err = this.state.errors;
      err.nameError = 'The name must be longer than 3 characters';
      this.setState({ errors: err });
      return false;
    } else {
      const err = this.state.errors;
      err.nameError = '';
      this.setState({ errors: err });
      return true;
    }
  };

  validationSurname = (): boolean => {
    const surname = this.surnameRef.current?.value;
    let isPattern;
    if (surname) {
      isPattern = surname.match(/^[a-zA-Z]*$/g);
    }

    if (!surname) {
      const err = this.state.errors;
      err.surnameError = 'The name must be longer than 3 characters';
      this.setState({ errors: err });
      return false;
    } else if (!isPattern) {
      const err = this.state.errors;
      err.surnameError = 'The name should contain only the letters a-z, A-Z';
      this.setState({ errors: err });
      return false;
    } else if (surname.length < 3) {
      const err = this.state.errors;
      err.surnameError = 'The surname must be longer than 3 characters';
      this.setState({ errors: err });
      return false;
    } else {
      const err = this.state.errors;
      err.surnameError = '';
      this.setState({ errors: err });
      return true;
    }
  };

  validationBirthday = (): boolean => {
    const birthday = this.birthdayRef.current?.value;
    let isPattern;
    if (birthday) {
      isPattern = birthday.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/g);
    }

    if (!isPattern) {
      const err = this.state.errors;
      err.birthdayError = 'The date must be in the format: DD-MM-YYYY';
      this.setState({ errors: err });
      return false;
    } else {
      const err = this.state.errors;
      err.birthdayError = '';
      this.setState({ errors: err });
      return true;
    }
  };

  validationCountry = (): boolean => {
    const country = this.countryRef.current?.value;
    if (country === DEFAULT_VALUE_COUNTRY) {
      const err = this.state.errors;
      err.countryError = 'Chose country';
      this.setState({ errors: err });
      return false;
    } else {
      const err = this.state.errors;
      err.countryError = '';
      this.setState({ errors: err });
      return true;
    }
  };

  validationPersonalData = (): boolean => {
    const value = this.personalDataRef.current?.checked;
    if (!value) {
      const err = this.state.errors;
      err.personaDataError = 'This field is required';
      this.setState({ errors: err });
      return false;
    } else {
      const err = this.state.errors;
      err.personaDataError = '';
      this.setState({ errors: err });
      return true;
    }
  };

  validationAvatar = (): boolean => {
    const file = this.avatarRef.current?.files;
    let isPattern;
    if (file && file.length) {
      isPattern = file[0].name.match(/.*\.(jpg|JPG|png|PNG)$/);
    }

    if (file && !file.length) {
      const err = this.state.errors;
      err.avatarError = 'Upload an image in JPG or PNG format';
      this.setState({ errors: err, validAvatar: '' });
      return false;
    } else if (!isPattern) {
      const err = this.state.errors;
      err.avatarError = 'The image must be in JPG or PNG format';
      this.setState({ errors: err, validAvatar: '' });
      return false;
    } else {
      const err = this.state.errors;
      err.avatarError = '';
      this.setState({ errors: err, validAvatar: 'true' });
      return true;
    }
  };

  onClickAvatar = (): void => {
    this.avatarRef.current?.click();
  };

  onClickSwitch = (): void => {
    this.switchRef.current?.click();
  };

  onClickPersonalData = (): void => {
    this.personalDataRef.current?.click();
  };

  validationAfterWrongPost = (): void => {
    const name = this.validationName();
    const surname = this.validationSurname();
    const birthday = this.validationBirthday();
    const country = this.validationCountry();
    const personalData = this.validationPersonalData();
    const avatar = this.validationAvatar();

    if (name && surname && birthday && country && personalData && avatar) {
      this.setState({ isDisabled: false });
    }
  };

  handleOnChange = (): void => {
    if (!this.state.isFirstInput) {
      this.firstInput();
    }

    if (this.state.isValid) {
      this.validationAfterWrongPost();
    }
  };

  clearForm = (): void => {
    this.setState({
      isFirstInput: false,
      isDisabled: true,
      isValid: false,
      validAvatar: '',
    });
    this.nameRef.current!.value = '';
    this.surnameRef.current!.value = '';
    this.birthdayRef.current!.value = '';
    this.countryRef.current!.value = DEFAULT_VALUE_COUNTRY;
    this.avatarRef.current!.value = '';
    this.personalDataRef.current!.checked = false;
    this.switchRef.current!.checked = false;
  };

  postData = () => {
    const cardData: FormData = {
      name: this.nameRef.current!.value,
      surname: this.surnameRef.current!.value,
      birthday: this.birthdayRef.current!.value,
      country: this.countryRef.current!.value,
      avatar: this.avatarRef.current!.files![0],
      personalData: this.personalDataRef.current!.checked,
      gender: this.switchRef.current!.checked,
    };
    this.props.getData(cardData);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.setState({ isDisabled: true, isValid: true });
    const isValidName = this.validationName();
    const isValidSurname = this.validationSurname();
    const isValidBirthday = this.validationBirthday();
    const isValidCountry = this.validationCountry();
    const personalData = this.validationPersonalData();
    const avatar = this.validationAvatar();

    if (
      isValidName &&
      isValidSurname &&
      isValidBirthday &&
      isValidCountry &&
      personalData &&
      avatar
    ) {
      this.postData();
      this.setState({ isDone: true });
      this.clearForm();
    }
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className={classes.container}
        noValidate
        data-testid="forms"
      >
        <Input
          type="text"
          label="firstName"
          title="Name:"
          className={classes.inputText}
          onChange={this.handleOnChange}
          ref={this.nameRef}
          error={this.state.errors.nameError}
          testid="inputName"
        />

        <Input
          type="text"
          label="surname"
          title="Surname:"
          className={classes.inputText}
          onChange={this.handleOnChange}
          ref={this.surnameRef}
          error={this.state.errors.surnameError}
          testid="inputSurname"
        />

        <Input
          type="date"
          label="birthday"
          title="Birthday:"
          className={classes.inputData}
          onChange={this.handleOnChange}
          ref={this.birthdayRef}
          error={this.state.errors.birthdayError}
          testid="inputDate"
        />

        <Select
          defaultValue={DEFAULT_VALUE_COUNTRY}
          label="country"
          title="Country:"
          options={SELECTOR_OPTIONS}
          onChange={this.handleOnChange}
          ref={this.countryRef}
          error={this.state.errors.countryError}
        />

        <InputFile
          label="avatar"
          title="Avatar:"
          ready={this.state.validAvatar}
          ref={this.avatarRef}
          onClick={this.onClickAvatar}
          onChange={this.handleOnChange}
          error={this.state.errors.avatarError}
        />

        <InputSwitch
          label="switch"
          title="Male/Female:"
          onClick={this.onClickSwitch}
          onChange={this.handleOnChange}
          ref={this.switchRef}
        />

        <InputCheckbox
          label="agree"
          title="Consent to data processing:"
          onClick={this.onClickPersonalData}
          onChange={this.handleOnChange}
          ref={this.personalDataRef}
          error={this.state.errors.personaDataError}
        />

        <Button className={classes.standardBtn} disabled={this.state.isDisabled}>
          Post
        </Button>
        {this.state.isDone && (
          <div className={classes.done} data-testid="final-text">
            Done
            <span className={classes.doneImg} data-testid="final-img"></span>
          </div>
        )}
      </form>
    );
  }
}
