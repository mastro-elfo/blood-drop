import React, { Component } from 'react';
import ErrorWrapper from './Components/ErrorWrapper';
import ThemeWrapper from './Components/ThemeWrapper';
import PrintWrapper from './Components/PrintWrapper';
import NotifyWrapper from './Components/NotifyWrapper';
import RouterWrapper from './Components/RouterWrapper';
import Router from './Components/Router';
import { Create } from './Actions/Database';

export default class App extends Component {
  componentDidMount() {
    Create()
      .then(() => {
        console.info('Database initialized');
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <ThemeWrapper>
        <RouterWrapper>
          <ErrorWrapper>
            <PrintWrapper>
              <NotifyWrapper>
                <Router />
              </NotifyWrapper>
            </PrintWrapper>
          </ErrorWrapper>
        </RouterWrapper>
      </ThemeWrapper>
    );
  }
}
