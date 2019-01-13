import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import Page from '../Page';
import Header from './HeaderEdit';
import Content from './ContentEdit';
import { Read, ReadAll } from '../../Actions/Record';
import uniq from 'lodash/uniq';

class DonationEdit extends Component {
  state = {
    record: null,
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    Read(id)
      .then(record => {
        this.setState({ record });
      })
      .catch(err => {
        console.error(err);
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
      });
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
          record, authorities,
          onChangeData: this.handleChangeData,
          onChangeRecord: this.handleChangeRecord
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

  handleChangeRecord = (field, value) => {
    const {record} = this.state;
    this.setState({
      record: {
        ...record,
        [field]: value
      }
    });
  }
}

export default withRouter(withSnackbar(DonationEdit));
