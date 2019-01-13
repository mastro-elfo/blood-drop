import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/red';
import secondary from '@material-ui/core/colors/orange';

export default function ThemeWrapper(props) {
  const THEME = createMuiTheme({
    palette: {
      primary,
      secondary,
    },
    typography: {
      useNextVariants: true,
    },
  });
  // console.info("Theme", THEME);
  return <MuiThemeProvider theme={THEME}>{props.children}</MuiThemeProvider>;
}
