import React, { PureComponent } from 'react';
import List from '@material-ui/core/List';
// import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Column from '../Column';
import Autosuggest from '../Autosuggest';
import { TYPES } from '../../Commons/types';

class Content extends PureComponent {
  render() {
    const { record, authorities } = this.props;
    if (!record) return <CircularProgress color="primary" />;

    const {
      record: {
        data: { date, quantity, type, authority, note },
        archived,
      },
    } = this.props;

    if (!record) return <CircularProgress color="primary" />;

    return (
      <Column>
        <List>
          <ListItem>
            <TextField
              fullWidth
              type="date"
              label="Data della donazione"
              value={new Date(date).toISOString().split('T')[0]}
              onChange={this.handleChange('date')}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              type="number"
              label="Quantità"
              value={quantity}
              InputProps={{
                startAdornment: <InputAdornment position="start">ml</InputAdornment>,
              }}
              onChange={this.handleChange('quantity')}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              select
              label="Tipo di donazione"
              value={type}
              onChange={this.handleChange('type')}
            >
              {Object.keys(TYPES).map(key => (
                <MenuItem key={key} value={key}>
                  {TYPES[key]}
                </MenuItem>
              ))}
            </TextField>
          </ListItem>
          <ListItem>
            <Autosuggest
              TextFieldProps={{
                fullWidth: true,
                label: 'Ente Trasfusionale'
              }}
              value={authority}
              suggestionList={authorities}
              onChange={this.handleChange('authority')}/>
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              multiline
              type="text"
              label="Note"
              rows={4}
              value={note}
              onChange={this.handleChange('note')}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={archived ? 'La scheda è archiviata' : 'La scheda è attiva'}
              secondary="Archiviazione scheda"
            />
            <ListItemSecondaryAction>
              <Switch checked={!archived} onChange={this.handleToggleArchived} />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Column>
    );
  }

  handleChange = field => ({ target: { value } }) => {
    let newValue = value;
    if (field === 'date') newValue = +new Date(value);
    if (field === 'quantity') newValue = +value.replace(/[^\d]/g, '');
    this.props.onChangeData(field, newValue);
  };

  handleToggleArchived = ({ target: { checked } }) => {
    this.props.onChangeRecord('archived', !checked);
  };
}

export default Content;
