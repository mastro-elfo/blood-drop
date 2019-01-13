import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import Page from '../Page';
import Header from './Header';
import Content from './Content';
import Drawer from './Drawer';

class DashboardView extends Component {
  state = {
    drawerOpen: false,
  };

  render() {
    return (
      <Page
        Header={Header}
        Content={Content}
        HeaderProps={{
          onDrawerOpen: this.handleDrawerOpen,
        }}
        Drawer={Drawer}
        DrawerProps={{
          open: this.state.drawerOpen,
          onClose: this.handleDrawerClose,
          onOpen: this.handleDrawerOpen,
        }}
      />
    );

  }

  handleDrawerOpen = () => {
    this.setState({
      drawerOpen: true,
    });
  };

  handleDrawerClose = () => {
    this.setState({
      drawerOpen: false,
    });
  };
}

export default withRouter(withSnackbar(DashboardView));
