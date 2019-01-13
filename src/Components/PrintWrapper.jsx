import React, { Component, Fragment, createContext } from 'react';
import { withStyles } from '@material-ui/core/styles';

const AContext = createContext({});

export function withPrint(Child) {
  return class extends Component {
    render() {
      return (
        <AContext.Consumer>
          {({ clearPrint, appendPrint }) => (
            <Child clearPrint={clearPrint} appendPrint={appendPrint} {...this.props} />
          )}
        </AContext.Consumer>
      );
    }
  };
}

class PrintWrapper extends Component {
  state = {
    child: null,
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <div className={classes.Screen}>
          <AContext.Provider
            value={{
              clearPrint: this.handleClearPrint,
              appendPrint: this.handleAppendPrint,
            }}
          >
            {this.props.children}
          </AContext.Provider>
        </div>
        <div className={classes.Print}>{this.state.child}</div>
      </Fragment>
    );
  }

  handleClearPrint = () => {
    this.setState({ child: null });
  };

  handleAppendPrint = append => {
    this.setState({
      child: append,
    });
  };
}

const styles = theme => ({
  Screen: {
    '@media print': {
      display: 'none',
    },
  },
  Print: {
    '@media screen': {
      display: 'none',
    },
  },
});

export default withStyles(styles)(PrintWrapper);
