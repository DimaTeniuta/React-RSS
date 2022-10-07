import { FormCard } from 'components/FormCard/FormCard';
import Forms from 'components/Forms/Forms';
import React, { Component } from 'react';
import { FormData } from 'types/formTypes';
import classes from './FormPage.module.scss';

interface StateFormPage {
  data: FormData[];
}

type PropsFormPage = object;

export default class FormPage extends Component<PropsFormPage, StateFormPage> {
  constructor(props: PropsFormPage) {
    super(props);
    this.state = {
      data: [],
    };
  }

  addData = (data: FormData): void => {
    this.setState({ data: [...this.state.data, data] });
  };

  render() {
    return (
      <div className={classes.container} data-testid="form-page">
        <Forms addData={this.addData} />
        <div className={classes.wrapCards}>
          {this.state.data && this.state.data.map((el, i) => <FormCard key={i} data={el} />)}
        </div>
      </div>
    );
  }
}
