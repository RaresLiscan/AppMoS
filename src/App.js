import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Registration from './registration';
import Home from './home';
import Login from './login';
import Logout from './logout';
import GoogleBtn from './GoogleBtm';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:activityId" component={Registration} />
        <Route>
          <Home />
          {/* <Login /> */}
          {/* <Logout /> */}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
