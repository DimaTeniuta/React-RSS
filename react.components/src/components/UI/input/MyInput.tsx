import React, { Component } from 'react';
import localStorageModule from 'utils/localStorage';
import classes from './MyInput.module.scss';

type InputProps = {
  type: string;
  getValue: (value: string) => void;
  onKeyEnter: () => void;
  isClearBtn: boolean;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
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

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      this.props.onKeyEnter();
    }
  };

  render() {
    return (
      <div>
        <input
          className={classes.myInput}
          type={this.props.type}
          value={this.state.value}
          onKeyDown={(event) => this.handleKeyDown(event)}
          onChange={(event) => this.handleChange(event)}
          placeholder={this.props.placeholder}
          autoFocus={this.props.autoFocus}
        />
        {this.props.isClearBtn ? (
          <span onClick={this.clear} className={classes.clearBtn} data-testid="clearBtn"></span>
        ) : (
          ''
        )}
      </div>
    );
  }
}
