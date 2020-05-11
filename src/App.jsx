import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './app.css';
import SourcesPage from './pages/sources';

export default () => (
  <Router>
    <Switch>
      <Route path="/sources" component={SourcesPage} exact />
      <Route path="/sources/:sourceId" component={SourcesPage} exact />
    </Switch>
  </Router>
);
