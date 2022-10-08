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

const DEFAULT_VALUE_COUNTRY = 'Country';

enum ErrorFieldNames {
  NAME = 'nameError',
  SURNAME = 'surnameError',
  BIRTHDAY = 'birthdayError',
  COUNTRY = 'countryError',
  PERSONAL_DATA = 'personaDataError',
  AVATAR = 'avatarError',
}

interface StateForms {
  isDisabled: boolean;
  isFirstInput: boolean;
  isValid: boolean;
  isDone: boolean;
  isValidAvatar: boolean;
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
      isValidAvatar: false,
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
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        [errorName]: errorText,
      },
    }));
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
    const errors = {
      [ErrorFieldNames.NAME]: validateTextInput(this.nameRef.current?.value),
      [ErrorFieldNames.SURNAME]: validateTextInput(this.surnameRef.current?.value),
      [ErrorFieldNames.BIRTHDAY]: validateDateInput(this.birthdayRef.current?.value),
      [ErrorFieldNames.COUNTRY]: validateSelectInput(
        this.countryRef.current?.value,
        DEFAULT_VALUE_COUNTRY
      ),
      [ErrorFieldNames.PERSONAL_DATA]: validateInputCheckbox(this.personalDataRef.current?.checked),
      [ErrorFieldNames.AVATAR]: validateInputFile(this.avatarRef.current?.files),
    };
    const errorsArray = Object.entries(errors);
    errors[ErrorFieldNames.AVATAR]
      ? this.setState({ isValidAvatar: false })
      : this.setState({ isValidAvatar: true });

    errorsArray.forEach((el) => this.setError(el[0], el[1]));
    return errorsArray.every((i) => !i[1]);
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
      isValidAvatar: false,
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
      genderMale: this.switchRef.current!.checked,
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
        <Input
          label="firstName"
          title="Name:"
          type="text"
          ref={this.nameRef}
          testid="inputName"
          error={this.state.errors.nameError}
        />

        <Input
          label="surname"
          title="Surname:"
          type="text"
          ref={this.surnameRef}
          testid="inputSurname"
          error={this.state.errors.surnameError}
        />

        <Input
          label="birthday"
          title="Birthday:"
          type="date"
          ref={this.birthdayRef}
          testid="inputDate"
          error={this.state.errors.birthdayError}
        />

        <Select
          label="country"
          title="Country:"
          defaultValue={DEFAULT_VALUE_COUNTRY}
          options={SELECTOR_OPTIONS}
          ref={this.countryRef}
          error={this.state.errors.countryError}
        />

        <InputFile
          label="avatar"
          title="Avatar:"
          ready={this.state.isValidAvatar.toString()}
          ref={this.avatarRef}
          onClick={this.onClickAvatar}
          error={this.state.errors.avatarError}
        />

        <InputSwitch
          label="switch"
          title="Male/Female:"
          onClick={this.onClickSwitch}
          ref={this.switchRef}
        />

        <InputCheckbox
          label="agree"
          title="Consent to data processing:"
          onClick={this.onClickPersonalData}
          ref={this.personalDataRef}
          error={this.state.errors.personaDataError}
        />

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
