import React from 'react';

import HomePage from 'containers/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';

import Login from 'containers/LoginPage';

import reducer from './reducer';
// import saga from './saga';

import ProtectedRoute from './AppRouting';
// import 'antd/dist/antd.css';
import './styles.scss';

const key = 'appRoot';

export default function App() {
  useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <ProtectedRoute path="/dashboard">
          <HomePage />
        </ProtectedRoute>
        <Route exact path="/">
          <Redirect exact from="/" to="dashboard" />
        </Route>
        <Route path="*">
          <Redirect from="/" to="dashboard" />
        </Route>
      </Switch>
    </Router>
  );
}
