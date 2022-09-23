import React, { Component } from 'react';
import localStorageModule from 'utils/localStorage';
import './MyInput.css';

type InputProps = {
  className?: string;
  type: string;
  placeholder?: string;
  autoFocus?: boolean;
  getValue: (value: string) => void;
};

type InputState = {
  value: string;
};

export default class MyInput extends Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);
    this.state = {
      value: '',
    };
  }

  componentDidMount = (): void => {
    const result: string | null = localStorageModule.getValue('inputValue');
    if (!result) {
      this.setState(() => ({
        value: '',
      }));
      return;
    }
    this.setState(() => ({
      value: result,
    }));
    this.props.getValue(result);
  };

  clear = () => {
    this.setState(() => ({
      value: '',
    }));
    this.props.getValue('');
  };

  componentWillUnmount = (): void => {
    localStorageModule.setValue('inputValue', this.state.value);
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState(() => ({
      value: event.target.value,
    }));
    this.props.getValue(event.target.value);
  };

  render() {
    return (
      <div>
        <input
          className="my-input"
          type={this.props.type}
          value={this.state.value}
          onChange={(event) => this.handleChange(event)}
          placeholder={this.props.placeholder}
          autoFocus={this.props.autoFocus}
        />
        <span onClick={this.clear} className="main__input-icon-close"></span>
      </div>
    );
  }
}
