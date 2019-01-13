import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
// import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Delete from '@material-ui/icons/Delete';
import Column from '../Column';
import { TYPES } from '../../Commons/types';

class Content extends PureComponent {
  render() {
    const {record} = this.props;
    if (!record) return <CircularProgress color="primary" />;

    const {
      record: {
        data: { date, quantity, type, authority, note },
        archived,
      },
    } = this.props;

    const language = navigator.language || navigator.userLanguage;
    const localeDate = new Date(date).toLocaleDateString(language, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return (
      <Column>
        <List>
          <ListItem>
            <ListItemText primary={localeDate} secondary="Data della donazione" />
          </ListItem>

          <ListItem>
            <ListItemText primary={`${quantity}ml`} secondary="Quantità" />
          </ListItem>

          <ListItem>
            <ListItemText
              primary={TYPES[type]}
              secondary="Tipo di donazione"
            />
          </ListItem>

          <ListItem>
            <ListItemText primary={authority} secondary="Ente Trasfusionale" />
          </ListItem>

          <ListItem>
            <ListItemText primary={note} secondary="Note" />
          </ListItem>

          {archived && (
            <ListItem>
              <ListItemText primary="La scheda è archiviata" secondary="Archiviazione" />
              <ListItemIcon>
                <Delete />
              </ListItemIcon>
            </ListItem>
          )}
        </List>
      </Column>
    );
  }
}

export default Content;
