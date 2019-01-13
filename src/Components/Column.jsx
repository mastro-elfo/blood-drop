import React, { PureComponent, Fragment, Children } from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const BREAKPOINTS = { xs: 12, sm: 8, md: 6, lg: 4, xl: 3 };

class Column extends PureComponent {
  render() {
    const { columns, children, classes, isFixed } = this.props;

    return (
      <Grid
        container
        justify="space-around"
        className={classnames({
          [classes.staticHeader]: !isFixed,
          [classes.fixedHeader]: isFixed,
        })}
      >
        <Grid item {...BREAKPOINTS}>
          {children}
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  fixedHeader: {
    paddingTop: theme.mixins.toolbar.minHeight + theme.spacing.unit,
    '@media (min-width:0px) and (orientation: landscape)': {
      paddingTop:
        theme.mixins.toolbar['@media (min-width:0px) and (orientation: landscape)'].minHeight +
        theme.spacing.unit,
    },
    '@media (min-width:600px)': {
      paddingTop: theme.mixins.toolbar['@media (min-width:600px)'].minHeight + theme.spacing.unit,
    },
  },
  staticHeader: {
    paddingTop: theme.spacing.unit,
  },
});

export default withStyles(styles)(Column);
