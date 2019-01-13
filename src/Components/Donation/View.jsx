import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import Page from '../Page';
import Header from './Header';
import Content from './Content';
import { Read } from '../../Actions/Record';

class DonationView extends Component {
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
        this.setState({ record: record });
      })
      .catch(err => {
        console.error(err);
        const { enqueueSnackbar } = this.props;
        enqueueSnackbar(err.message, {
          variant: 'error',
        });
      });
  }

  render() {
    const { record } = this.state;

    return (
      <Page
        Header={Header}
        HeaderProps={{
          record,
        }}
        Content={Content}
        ContentProps={{
          record,
        }}
      />
    );
  }
}

export default withRouter(withSnackbar(DonationView));
