import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Registration from './registration';
import Home from './home';
import Menu from "./sections/menu";
import Authenticate from "./account/authenticate";
import ProtectedRoute from "./account/ProtectedRoute";


function App() {
  return (
    <div>
        <Router>
            <Menu/>
            <Switch>
                <Route path={"/login"}>
                    <Authenticate/>
                </Route>
                <Route path="/:activityId" component={Registration} />
                <ProtectedRoute>
                    <Home />
                    {/* <Login /> */}
                    {/* <Logout /> */}
                </ProtectedRoute>
            </Switch>
        </Router>
    </div>
  );
}

export default App;
