import React from 'react';
import { Grid } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import './app.scss';
import SourcesPage from './pages/sources';
import SourceObservations from './pages/sources/observations';

export default () => (
  <Grid style={{ width: '100%', margin: '0 auto', maxWidth: '90rem' }}>
    <Router>
      <Switch>
        <Route path="/sources" component={SourcesPage} exact />
        <Route path="/source/:sourceId" component={SourceObservations} exact />
      </Switch>
    </Router>
  </Grid>
);
