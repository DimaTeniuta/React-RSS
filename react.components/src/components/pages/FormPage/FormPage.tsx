import Forms from 'components/Forms/Forms';
import React, { Component } from 'react';
import { FormCard } from 'types/generalTypes';

interface StateFormPage {
  data: FormCard[];
}

type PropsFormPage = object;

export default class FormPage extends Component<PropsFormPage, StateFormPage> {
  constructor(props: PropsFormPage) {
    super(props);
    this.state = {
      data: [],
    };
  }
  render() {
    return (
      <>
        <Forms />
      </>
    );
  }
}
