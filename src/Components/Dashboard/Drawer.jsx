import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
// import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import BrokenImage from '@material-ui/icons/BrokenImage';
import Settings from '@material-ui/icons/Settings';
import Info from '@material-ui/icons/Info';

class Drawer extends PureComponent {
  render() {
    const {
      history: { push },
      open,
      onClose,
      onOpen,
    } = this.props;
    return (
      <SwipeableDrawer open={open} onClose={onClose} onOpen={onOpen}>
        <List>
          <ListItem
            button
            title="Info"
            onClick={() => push('/info')}
          >
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText primary="Informazioni" />
          </ListItem>

          <ListItem button title="Impostazioni" onClick={() => push('/settings')}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Impostazioni" />
          </ListItem>
        </List>
      </SwipeableDrawer>
    );
  }
}

export default withRouter(Drawer);
