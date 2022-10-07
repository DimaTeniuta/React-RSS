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
import {
  validateDateInput,
  validateInputCheckbox,
  validateInputFile,
  validateSelectInput,
  validateTextInput,
} from 'utils/validator';
import { Label } from 'components/UI/Label/Label';

const DEFAULT_VALUE_COUNTRY = 'Country';

enum ErrorFieldNames {
  NAME_ERROR = 'nameError',
  SURNAME_ERROR = 'surnameError',
  BIRTHDAY_ERROR = 'birthdayError',
  COUNTRY_ERROR = 'countryError',
  PERSONAL_DATA_ERROR = 'personaDataError',
  AVATAR_ERROR = 'avatarError',
}

interface StateForms {
  isDisabled: boolean;
  isFirstInput: boolean;
  isValid: boolean;
  isDone: boolean;
  validAvatar: string;
  errors: Record<string, string>;
}

type PropsForms = {
  addData: (data: FormData) => void;
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

  setError = (errorName: string, errorText: string): void => {
    const err = this.state.errors;
    err[errorName] = errorText;
    this.setState({ errors: err });
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

  validateForm = (): boolean => {
    const nameError = validateTextInput(this.nameRef.current?.value);
    this.setError(ErrorFieldNames.NAME_ERROR, nameError);
    const surnameError = validateTextInput(this.surnameRef.current?.value);
    this.setError(ErrorFieldNames.SURNAME_ERROR, surnameError);
    const birthdayError = validateDateInput(this.birthdayRef.current?.value);
    this.setError(ErrorFieldNames.BIRTHDAY_ERROR, birthdayError);
    const countryError = validateSelectInput(this.countryRef.current?.value, DEFAULT_VALUE_COUNTRY);
    this.setError(ErrorFieldNames.COUNTRY_ERROR, countryError);
    const personalDataError = validateInputCheckbox(this.personalDataRef.current?.checked);
    this.setError(ErrorFieldNames.PERSONAL_DATA_ERROR, personalDataError);
    const avatarError = validateInputFile(this.avatarRef.current?.files);
    this.setError(ErrorFieldNames.AVATAR_ERROR, avatarError);
    avatarError ? this.setState({ validAvatar: '' }) : this.setState({ validAvatar: 'true' });

    if (
      !nameError &&
      !surnameError &&
      !birthdayError &&
      !countryError &&
      !personalDataError &&
      !avatarError
    ) {
      return true;
    }
    return false;
  };

  validateAfterWrongPost = (): void => {
    const isValidForm = this.validateForm();
    if (isValidForm) {
      this.setState({ isDisabled: false });
    }
  };

  handleOnChange = (): void => {
    if (!this.state.isFirstInput) {
      this.firstInput();
    }

    if (this.state.isValid) {
      this.validateAfterWrongPost();
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
    this.props.addData(cardData);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.setState({ isDisabled: true, isValid: true });
    const isValidForm = this.validateForm();

    if (isValidForm) {
      this.postData();
      this.setState({ isDone: true });
      this.clearForm();
    }
  };

  render() {
    return (
      <form
        className={classes.container}
        onSubmit={this.handleSubmit}
        onChange={this.handleOnChange}
        noValidate
        data-testid="forms"
      >
        <Label label="firstName" title="Name:" error={this.state.errors.nameError}>
          <Input type="text" ref={this.nameRef} testid="inputName" />
        </Label>

        <Label label="surname" title="Surname:" error={this.state.errors.surnameError}>
          <Input type="text" ref={this.surnameRef} testid="inputSurname" />
        </Label>

        <Label label="birthday" title="Birthday:" error={this.state.errors.birthdayError}>
          <Input type="date" ref={this.birthdayRef} testid="inputSurname" />
        </Label>

        <Label label="country" title="Country:" error={this.state.errors.countryError}>
          <Select
            defaultValue={DEFAULT_VALUE_COUNTRY}
            options={SELECTOR_OPTIONS}
            ref={this.countryRef}
          />
        </Label>

        <Label label="avatar" title="Avatar:" error={this.state.errors.avatarError}>
          <InputFile
            ready={this.state.validAvatar}
            ref={this.avatarRef}
            onClick={this.onClickAvatar}
          />
        </Label>

        <Label label="switch" title="Male/Female:">
          <InputSwitch onClick={this.onClickSwitch} ref={this.switchRef} />
        </Label>

        <Label label="agree" title="Consent to data processing:">
          <InputCheckbox
            onClick={this.onClickPersonalData}
            ref={this.personalDataRef}
            error={this.state.errors.personaDataError}
          />
        </Label>

        <Button disabled={this.state.isDisabled}>Post</Button>

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
