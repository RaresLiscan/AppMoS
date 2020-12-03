import React, {useEffect, useState} from 'react';
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
import EditareRaport from "./rapoarte/editRaportDeActivitate";
import firebase from "firebase";

async function initFirebase() {
    var firebaseConfig = {
        apiKey: "AIzaSyBnecGisno9aNKVRIgEBrmO6prFxSS1gNM",
        authDomain: "moseadori.firebaseapp.com",
        databaseURL: "https://moseadori.firebaseio.com",
        projectId: "moseadori",
        storageBucket: "moseadori.appspot.com",
        messagingSenderId: "903421930963",
        appId: "1:903421930963:web:f8e2574a6ecb721cba5326",
        measurementId: "G-9N3EMLG97F"
    };
    // Initialize Firebase
    await firebase.initializeApp(firebaseConfig);
    await firebase.analytics();
}


function App() {

    const [init, setInit] = useState(false);
    const [provider, setAuthProvider] = useState({});

    useEffect(() => {
        if (!init) {
            initFirebase();
            var authProvider = new firebase.auth.GoogleAuthProvider();
            authProvider.setCustomParameters({
                'login_hint': 'user@amosed.ro',
                'hd': 'amosed.ro',
            })
            setAuthProvider(new firebase.auth.GoogleAuthProvider());
            setInit(true);
        }
    })

    if (!init) {
        return <div></div>
    }

  return (
    <div>
        <Router>
            <Menu/>
            <Switch>
                <Route path={"/login"}>
                    <Authenticate authProvider={provider}/>
                </Route>
                <Route path="/:activityId" component={Registration} />
                <ProtectedRoute path={"/reportEdit"}>
                    <EditareRaport/>
                </ProtectedRoute>
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
