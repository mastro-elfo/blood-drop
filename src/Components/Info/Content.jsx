import React, {Component} from 'react';
import {shell, remote} from 'electron';
import {withSnackbar} from 'notistack';
import {withStyles} from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Column from '../Column';
import Email from '@material-ui/icons/Email';
import {ReadAll} from '../../Actions/Record';

class Content extends Component {
	state = {
		donations: 0
	}

	componentDidMount(){
		ReadAll('donation')
    .then(donations => {
      this.setState({donations: donations.length});
    })
    .catch(err => {
      console.error({err});
      const {enqueueSnackbar} = this.props;
      enqueueSnackbar(err.message, {variant: 'error'});
    });
	}

	render(){
		const {classes} = this.props;
		const {donations} = this.state;

		return (
			<Column>
        <List
          subheader={
            <ListSubheader
              className={classes.ListSubheader}>
              Applicazione
            </ListSubheader>
          }>
          <ListItem>
            <ListItemText
              primary="Blood Drop"
              secondary="Libretto personale delle donazioni di sangue"/>
          </ListItem>
          <ListItem>
            <ListItemText
              primary={remote.app.getVersion()}
              secondary="Versione"/>
          </ListItem>
        </List>
        <Divider/>
        <List
          subheader={
            <ListSubheader
              className={classes.ListSubheader}>
              Sviluppo
            </ListSubheader>
          }>
          <ListItem>
            <ListItemText
              primary="Francesco Michienzi"
              secondary="Sviluppatore"/>
          </ListItem>
          <ListItem
            button
            title="Clicca per inviare un'email allo sviluppatore"
            onClick={()=>shell.openExternal(`mailto:francesco.209@gmail.com?subject=BloodDrop%20${remote.app.getVersion()}`)}>
            <ListItemText
              primary="francesco.209@gmail.com"
              secondary="Email"/>
            <ListItemIcon>
              <Email/>
            </ListItemIcon>
          </ListItem>
        </List>
        <Divider/>
        <List
          subheader={
            <ListSubheader
              className={classes.ListSubheader}>
              Database
            </ListSubheader>
          }>
          <ListItem>
            <ListItemText
              primary={donations}
              secondary="Donazioni"/>
          </ListItem>
        </List>
      </Column>
		);
	}
}

const styles = theme => ({
	ListSubheader: {
		background: 'white'
	}
});

export default withSnackbar(withStyles(styles)(Content));
