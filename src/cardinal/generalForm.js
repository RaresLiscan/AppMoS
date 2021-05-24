import React, {useState, useEffect} from 'react';
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {colors} from "../colors";
import GoogleButton from 'react-google-button';
import {useParams} from 'react-router-dom';
import * as EmailValidator from 'email-validator';
import axios from 'axios';
import firebase from 'firebase';

const useStyles = makeStyles({
    root: {
        width: '80%',
    },
    button: {
        backgroundColor: '#001c2f',
        color: 'white',
        "&:hover": {
            backgroundColor: colors.red,
            color: colors.white
        }
    },
    googleButton: {
        backgroundColor: "#dbdbdb",
        color: colors.blue5,
        "&:hover": {
            backgroundColor: colors.blue5,
            color: colors.white
        }
    }
})

const API_URL = "http://localhost:8080";

export default function GeneralForm({ authProvider }) {

    const {id} = useParams();
    const [project, setProject] = useState({});
    const [gdpr, setGdpr] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');


    const getProject = async() => {
        await fetch(`${API_URL}/projects/${id}`)
            .then(res => res.json())
            .then(response => {
                setProject(response);
            })
            .catch(error => {
                console.error(error);
            })
    }

    useEffect(() => {
        getProject();
    }, [])

    const classes = useStyles();

    const renderPhone = () => {
        return (
            <TextField id="phone"
                       label="Numar de telefon"
                       fullWidth
                       onChange={event => setPhone(event.currentTarget.value)}
                       value={phone}
            />
        )
    }

    const renderEmail = () => {
        return (
            <TextField id="email"
                       label="Email"
                       fullWidth
                       onChange={event => setEmail(event.currentTarget.value)}
                       value={email}
            />
        )
    }

    //If the user is completing the form REQUEST http://localhost:8080/participants/newUser
    const register = () => {
        //Email Validation
        if (!gdpr) {
            alert("Pentru a te înregistra avem nevoie de acordul tău pentru prelucrarea datelor cu caracter personal.");
        }
        if (EmailValidator.validate(email)) {
            const requestBody = {
                projectId: project.id,
                phoneNumber: phone,
                email: email,
                gdpr: gdpr,
            };
            console.log(requestBody);
            axios.post(`${API_URL}/participants/newUser`, JSON.stringify(requestBody), {headers: {
                "Content-Type": "application/json"
            }})
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.error(error);
                })
        }
        else {
            alert("Email-ul nu este corect");
        }
    }

    //With google login, REQUEST http://localhost:8080/participants/moseador
    const googleLogin = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(function() {
                return firebase.auth().signInWithPopup(authProvider).then(async function (result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    // var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    await axios.post(`${API_URL}/participants/moseador`, JSON.stringify({
                        userEmail: user.email,
                        projectId: project.id,
                        userName: user.displayName,
                    }), {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    })
                        .then(response => {
                            console.log(response);
                        })
                        .catch(error => {
                            console.error(error);
                        })
                }).catch(function (error) {
                    console.error(error);
                    throw new Error(error);
                });
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleGdprChange = () => {
        setGdpr(!gdpr);
    }

    const LabelComponent = () => {
        return (
            <p>
                Sunt de acord cu <a href={"https://www.amosed.ro/wp-content/uploads/2020/11/GDPR-Doc_.docx.pdf"}
                                    target={"_blank"}>politica de confidențialitate cu privire la prelucrarea datelor cu
                caracter personal</a>
            </p>
        )
    }

    return (
        <div style={{backgroundColor: 'white', margin: '15px 10%', padding: '1%'}}>
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 25}}>Inscrie-te la activitate</p>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="name"
                               label="Nume si prenume"
                               fullWidth
                               onChange={event => setName(event.currentTarget.value)}
                               value={name}
                    />

                    {renderPhone()}
                    {renderEmail()}

                    <FormControlLabel
                        style={{marginTop: '2%', marginBottom: '1%'}}
                        control={
                            <Checkbox
                                checked={gdpr}
                                onChange={handleGdprChange}
                                name="gdpr"
                                color="primary"
                            />
                        }
                        label={<LabelComponent/>}
                    />

                    <div>
                        <Button style={{marginTop: '2%'}} onClick={() => register()} variant="contained"
                                className={classes.button}>
                            Înscrie-te!
                        </Button>
                    </div>
                    <div>
                        <p>Sau</p>
                        <GoogleButton
                            type={"light"}
                            onClick={() => googleLogin()}
                            label={"Logheaza-te cu G Suite"}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}