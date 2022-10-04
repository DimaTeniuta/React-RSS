import { Input } from 'components/UI/Input/Input';
import React, { Component } from 'react';
import classes from './Forms.module.scss';
import SELECT_DATA from '../../data/optionsForSelect.json';
import Button from 'components/UI/Button/Button';
import { Select } from 'components/UI/Select/Select';
import { InputFile } from 'components/UI/InputFile/InputFile';
import { Switch } from 'components/UI/Switch/Switch';
import { InputCheckbox } from 'components/UI/InputCheckbox/InputCheckbox';
import { SelectData } from 'types/formTypes';
import { FormData } from 'types/formTypes';

const DEFAULT_VALUE_COUNTRY = 'Country';

interface StateForms {
  selectData: SelectData[];
  isDisabled: boolean;
  isFirstInput: boolean;
  isValid: boolean;
  isClickAvatar: boolean;
  validAvatar: string;
  nameRef: React.RefObject<HTMLInputElement>;
  surnameRef: React.RefObject<HTMLInputElement>;
  birthdayRef: React.RefObject<HTMLInputElement>;
  countryRef: React.RefObject<HTMLSelectElement>;
  avatarRef: React.RefObject<HTMLInputElement>;
  personalDataRef: React.RefObject<HTMLInputElement>;
  switchRef: React.RefObject<HTMLInputElement>;
  nameError: string;
  surnameError: string;
  birthdayError: string;
  countryError: string;
  avatarError: string;
  personaDataError: string;
}

type PropsForms = {
  getData: (data: FormData) => void;
};

export default class Forms extends Component<PropsForms, StateForms> {
  constructor(props: PropsForms) {
    super(props);
    this.state = {
      selectData: SELECT_DATA,
      isFirstInput: false,
      isDisabled: true,
      isValid: false,
      isClickAvatar: false,
      nameRef: React.createRef(),
      surnameRef: React.createRef(),
      birthdayRef: React.createRef(),
      countryRef: React.createRef(),
      avatarRef: React.createRef(),
      personalDataRef: React.createRef(),
      switchRef: React.createRef(),
      validAvatar: '',
      nameError: '',
      surnameError: '',
      birthdayError: '',
      countryError: '',
      avatarError: '',
      personaDataError: '',
    };
  }

  firstInput = (): void => {
    if (
      this.state.nameRef ||
      this.state.surnameRef ||
      this.state.birthdayRef ||
      this.state.countryRef ||
      this.state.personalDataRef ||
      this.state.isClickAvatar
    ) {
      this.setState({ isDisabled: false, isFirstInput: true });
    }
  };

  validationName = (): boolean => {
    const name = this.state.nameRef.current?.value;
    let isPattern;
    if (name) {
      isPattern = name.match(/^[a-zA-Z]*$/g);
    }

    if (!name) {
      this.setState({ nameError: 'The name must be longer than 3 characters' });
      return false;
    } else if (!isPattern) {
      this.setState({ nameError: 'The name should contain only the letters a-z, A-Z' });
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

    if (!surname) {
      this.setState({ surnameError: 'The surname must be longer than 3 characters' });
      return false;
    } else if (!isPattern) {
      this.setState({ surnameError: 'The name should contain only the letters a-z, A-Z' });
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
    if (country === DEFAULT_VALUE_COUNTRY) {
      this.setState({ countryError: 'Chose country' });
      return false;
    } else {
      this.setState({ countryError: '' });
      return true;
    }
  };

  validationPersonalData = (): boolean => {
    const value = this.state.personalDataRef.current?.checked;
    if (!value) {
      this.setState({ personaDataError: 'This field is required' });
      return false;
    } else {
      this.setState({ personaDataError: '' });
      return true;
    }
  };

  validationAvatar = (): boolean => {
    const file = this.state.avatarRef.current?.files;
    let isPattern;
    if (file && file.length) {
      isPattern = file[0].name.match(/.*\.(jpg|JPG|png|PNG)$/);
    }

    if (file && !file.length) {
      this.setState({ avatarError: 'Upload an image in JPG or PNG format', validAvatar: '' });
      return false;
    } else if (!isPattern) {
      this.setState({
        avatarError: 'The image must be in JPG or PNG format',
        validAvatar: '',
      });
      return false;
    } else {
      this.setState({ avatarError: '', validAvatar: 'true' });
      return true;
    }
  };

  onClickAvatar = (): void => {
    this.state.avatarRef.current?.click();
    this.setState({ isClickAvatar: true });
    if (!this.state.isFirstInput) {
      this.firstInput();
    }
  };

  onClickSwitch = (): void => {
    this.state.switchRef.current?.click();
    if (!this.state.isFirstInput) {
      this.firstInput();
    }
  };

  onClickPersonalData = (): void => {
    this.state.personalDataRef.current?.click();
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
    this.setState({ isFirstInput: false, isDisabled: true, isValid: false, validAvatar: '' });
    this.state.nameRef.current!.value = '';
    this.state.surnameRef.current!.value = '';
    this.state.birthdayRef.current!.value = '';
    this.state.countryRef.current!.value = DEFAULT_VALUE_COUNTRY;
    this.state.avatarRef.current!.value = '';
    this.state.personalDataRef.current!.checked = false;
    this.state.switchRef.current!.checked = false;
  };

  postData = () => {
    const cardData: FormData = {
      name: this.state.nameRef.current!.value,
      surname: this.state.surnameRef.current!.value,
      birthday: this.state.birthdayRef.current!.value,
      country: this.state.countryRef.current!.value,
      avatar: URL.createObjectURL(this.state.avatarRef.current!.files![0]),
      personalData: this.state.personalDataRef.current!.checked,
      gender: this.state.switchRef.current!.checked,
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
          defaultValue={DEFAULT_VALUE_COUNTRY}
          label="country"
          title="Country:"
          options={this.state.selectData}
          onChange={this.handleOnChange}
          ref={this.state.countryRef}
          error={this.state.countryError}
        />

        <InputFile
          label="avatar"
          title="Avatar:"
          ready={this.state.validAvatar}
          ref={this.state.avatarRef}
          onClick={this.onClickAvatar}
          onChange={this.handleOnChange}
          error={this.state.avatarError}
        />

        <Switch
          label="switch"
          title="Male/Female:"
          onClick={this.onClickSwitch}
          ref={this.state.switchRef}
        />

        <InputCheckbox
          label="agree"
          title="Consent to data processing:"
          onClick={this.onClickPersonalData}
          onChange={this.handleOnChange}
          ref={this.state.personalDataRef}
          error={this.state.personaDataError}
        />

        <Button className={classes.standardBtn} disabled={this.state.isDisabled}>
          Post
        </Button>
      </form>
    );
  }
}
