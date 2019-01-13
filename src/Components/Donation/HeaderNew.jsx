import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ActionIcon from '@material-ui/icons/Save';
import Header from '../Header';
import { Create } from '../../Actions/Record';
import { TYPES } from '../../Commons/types';

class DonationHeader extends PureComponent {
  render() {
    return (
      <Header
        title="Nuova donazione"
        action={this.handleSave}
        actionTitle="Salva"
        actionIcon={<ActionIcon />}
      />
    );
  }

  handleSave = () => {
    const {
      record: {
        data,
        data: { date, quantity, type, authority, note },
      },
      enqueueSnackbar,
      history: { replace },
    } = this.props;

    // Validity check
    if (quantity === 0) {
      enqueueSnackbar('La quantità non può essere zero', { variant: 'warning' });
      return;
    }
    if (authority.trim() === '') {
      enqueueSnackbar('Inserisci un ente trasfusionale', { variant: 'warning' });
      return;
    }

    const language = navigator.language || navigator.userLanguage;
    const localeDate = new Date(date).toLocaleDateString(language, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    Create(
      'donation',
      data,
      [
        localeDate,
        type,
        authority,
        note
          .replace(/[^a-zA-Z0-9]/g, ' ')
          .split(' ')
          .filter(item => item.length > 3)
          .sort((a, b) => b.length - a.length)
          .join(' '),
      ]
        .filter(item => !!item)
        .join(' '),
      {
        primary: `${TYPES[type]}, ${localeDate}`,
        secondary: authority,
      },
    )
      .then(id => replace(`/donation/view/${id}`))
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: 'error' });
      });
  };
}

export default withRouter(withSnackbar(DonationHeader));
