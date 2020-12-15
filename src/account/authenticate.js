import React from 'react';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from "@material-ui/core/styles";
import authProviderClass from "./authProvider";
import firebase from "firebase";
import {Button} from "@material-ui/core";
import {colors} from "../colors";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
    paper: {
        margin: 70,
        maxWidth: 500,
        padding: '1%',
    },
    button: {
        backgroundColor: colors.blue4,
        color: 'white',
        '&:hover': {
            backgroundColor: 'red',
        },
        marginBottom: '3%'
    }
})

//Pagina de login cu G Suite
export default function Authenticate({authProvider}) {

    const classes = useStyles();
    const history = useHistory();

    //TODO: Request to server

    const googleAuth = () => {
        firebase.auth().signInWithPopup(authProvider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            authProviderClass.login(user);
            history.push('/');
            //TODO: server request with the data to register user in SQL

        }).catch(function(error) {
            console.error(error);
        });
    }

    return (
        <div>
            <center>
                <Paper variant={"outlined"} elevation={3} className={classes.paper}>
                    {/*<img src={logo} height={70} />*/}
                    <p style={{fontSize: 30, fontWeight: 'bold'}}>Autentificare</p>
                    <p style={{fontSize: 20}}>Pentru a putea folosi aplicația AppMoS ED, conectează-te te rog cu <b>contul tău de G Suite</b></p>
                    <Button variant={"contained"} className={classes.button} onClick={() => googleAuth()}>Autentificare</Button>
                </Paper>
            </center>
        </div>
    )
}