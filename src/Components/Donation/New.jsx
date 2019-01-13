import React, { Component } from 'react';
import Page from '../Page';
import Header from './HeaderNew';
import Content from './ContentNew';
import { ReadAll } from '../../Actions/Record';
import { TYPES } from '../../Commons/types';
import uniq from 'lodash/uniq';

class DonationNew extends Component {
  state = {
    record: {
      data: {
        date: +new Date(),
        quantity: 0,
        type: Object.keys(TYPES)[0],
        authority: '',
        note: '',
      },
    },
    authorities: [],
  };

  componentDidMount() {
    ReadAll('donation').then(rows => {
      this.setState({
        authorities: uniq(rows.map(row => row.data.authority).filter(item => !!item)),
      });
    });
  }

  render() {
    const { record, authorities } = this.state;

    return (
      <Page
        Header={Header}
        HeaderProps={{
          record,
        }}
        Content={Content}
        ContentProps={{
          record,
          authorities,
          onChangeData: this.handleChangeData,
        }}
      />
    );
  }

  handleChangeData = (field, value) => {
    const {
      record,
      record: { data },
    } = this.state;
    this.setState({
      record: {
        ...record,
        data: {
          ...data,
          [field]: value,
        },
      },
    });
  };
}

export default DonationNew;
