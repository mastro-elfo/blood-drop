import React, { Component, PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Page from './Page';

class ErrorWrapper extends Component {
  state = {};

  componentDidCatch(error, info) {
    console.error('Console Error', error, info, this.props);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  render() {
    const { classes } = this.props;
    const { error } = this.state;

    if (error) {
      return (
        <Page
          Header={ErrorHeader}
          HeaderProps={{ classes, history }}
          Content={ErrorContent}
          ContentProps={{ error }}
        />
      );
    }
    return this.props.children;
  }
}

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
});

export default withRouter(withStyles(styles)(ErrorWrapper));

class ErrorHeader extends PureComponent {
  render() {
    const {
      classes,
      history: { replace },
    } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            title="Torna alla pagina principale"
            onClick={() => replace('/dashboard')}
          >
            <DashboardIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Errore
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

class ErrorContent extends PureComponent {
  render() {
    const { error } = this.props;
    return (
      <Typography variant="body1" component="main">
        <Typography paragraph>C'è stato un errore nell'esecuzione dell'applicazione:</Typography>
        <Typography paragraph>{error.message}</Typography>
        <Typography paragraph component="ul">
          {error.stack.split('\n').map((item, i) => (
            <Typography key={i} component="li">
              {item}
            </Typography>
          ))}
        </Typography>
      </Typography>
    );
  }
}
