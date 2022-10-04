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

  getData = (data: FormData): void => {
    const arr = [...this.state.data, data];
    this.setState({ data: arr });
  };

  render() {
    return (
      <div className={classes.container}>
        <Forms getData={this.getData} />
        <div className={classes.wrapCards}>
          {this.state.data && this.state.data.map((el, i) => <FormCard key={i} data={el} />)}
        </div>
      </div>
    );
  }
}
