import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

export default function RouterWrapper({ children }) {
  return <Router>{children}</Router>;
}
