import React, {PureComponent} from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/icons/Menu';
import Add from '@material-ui/icons/Add';
import PrintIcon from '@material-ui/icons/Print';
import {withPrint} from '../PrintWrapper';
import { Read, ReadAll } from '../../Actions/Record';
import PrintPage from './Print';

class DashboardHeader extends PureComponent {
  render(){
    const {
      classes,
      onDrawerOpen,
      history: { push },
    } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" title="Apri il menù" onClick={onDrawerOpen}>
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Libretto delle donazioni
          </Typography>
          <IconButton color="inherit" title="Stampa libretto" onClick={this.handlePrint}>
            <PrintIcon />
          </IconButton>
          <IconButton color="inherit" title="Nuova donazione" onClick={() => push('/donation/new')}>
            <Add />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }

  handlePrint = () => {
    const {clearPrint, appendPrint} = this.props;
    clearPrint();
    ReadAll('donation')
    .then(rows => appendPrint(<PrintPage rows={rows}/>))
    .then(() => window.print())
    .catch(err => {
      console.error(err);
      enqueueSnackbar(err.message, {variant: 'error'});
    });
  }
}

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
});

export default withPrint(withSnackbar(withRouter(withStyles(styles)(DashboardHeader))));
