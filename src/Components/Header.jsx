import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import Edit from '@material-ui/icons/Edit';
import ArrowBack from '@material-ui/icons/ArrowBack';

class Header extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    action: PropTypes.func,
    actionTitle: PropTypes.string,
    actionIcon: PropTypes.node,
    actionLoading: PropTypes.bool,
  };

  static defaultProps = {
    action: null,
    actionTitle: '',
    actionIcon: null,
    actionLoading: false,
  };

  render() {
    const {
      classes,
      history: { goBack },
      title,
      action,
      actionTitle,
      actionIcon,
      actionLoading,
    } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" title="Torna indietro" onClick={goBack} tabIndex={-1}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {title}
          </Typography>
          {action && (
            <IconButton color="inherit" title={actionTitle} onClick={action}>
              {actionIcon}
              {actionLoading && <CircularProgress className={classes.Absolute} color="inherit" />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  Absolute: {
    position: 'absolute',
  },
});

export default withRouter(withStyles(styles)(Header));
