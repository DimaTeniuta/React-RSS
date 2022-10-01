import React, { Component } from 'react';
import Button from '../Button/Button';
import classes from './InputSearch.module.scss';

interface InputProps {
  type: string;
  placeholder: string;
  autoFocus: boolean;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  clearInput: () => void;
}

interface InputState {
  value: string;
}

export default class InputSearch extends Component<InputProps, InputState> {
  render() {
    return (
      <div>
        <input
          className={classes.myInput}
          type={this.props.type}
          value={this.props.value}
          onChange={this.props.onChange}
          onKeyDown={this.props.onKeyDown}
          placeholder={this.props.placeholder}
          autoFocus={this.props.autoFocus}
        />
        <Button
          className={classes.clearBtn}
          onClick={this.props.clearInput}
          data-testid="clear-btn"
        />
      </div>
    );
  }
}
