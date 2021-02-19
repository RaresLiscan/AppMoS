import React, {useEffect, useState} from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Registration from './cardinal/registration';
import Home from './home';
import Menu from "./sections/menu";
import Authenticate from "./account/authenticate";
import ProtectedRoute from "./account/ProtectedRoute";
import EditareRaport from "./rapoarte/editRaportDeActivitate";
import firebase from "firebase";
import SelectareActivitate from "./cardinal/selectareActivitate";
import authProviderClass from './account/authProvider';
import User from './account/user.model';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import {roRO} from '@material-ui/core/locale';
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const theme = createMuiTheme({}, roRO);

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
    const [userSet, setUser] = useState(false);

    const updateUser = async (email, name) => {
        const userModel = new User(name, email);
        await authProviderClass.authServerRequest(userModel)
            .then(user => {
                authProviderClass.setUserState(user, true);
            })
            .catch(error => console.log(error));

    }

    const checkUserSession = async () => {
        await firebase.auth().onAuthStateChanged(async user => {
            if (user) {
                await updateUser(user.email, user.displayName);
            }
            setUser(true);
        });
    }

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
            checkUserSession();
        }
    });

    if (!init || !userSet) {
        return <div></div>
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>
                <Router>
                    <Menu/>
                    <Switch>
                        <ProtectedRoute path={"/reportEdit"} exact>
                            <EditareRaport/>
                        </ProtectedRoute>

                        <ProtectedRoute path={"/selectActivity"} exact>
                            <SelectareActivitate/>
                        </ProtectedRoute>

                        <Route path={"/login"} exact>
                            <Authenticate authProvider={provider}/>
                        </Route>

                        <Route path="/:activityId" component={Registration} exact/>

                        <ProtectedRoute>
                            <Home/>
                        </ProtectedRoute>
                    </Switch>
                </Router>
            </div>
        </MuiPickersUtilsProvider>
    );
}

export default App;
