import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import GoogleBtn from './GoogleBtm';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Grid from '@material-ui/core/Grid';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Login from './login';


const useStyles = makeStyles((theme) => ({
    root: {
        // display: 'flex',
        // flexWrap: 'wrap',
        width: '80%',
    },
    field: {
        width: '80%'
    },
    button: {
        backgroundColor: '#001c2f',
        color: 'white',
        "&:hover": {
            backgroundColor: "#cae8d5",
            color: '#001c2f'
        }
    },
    button_moseador: {
        backgroundColor: '#204051',
        color: 'white',
        "&:hover": {
            backgroundColor: "#cae8d5",
            color: '#001c2f'
        }
    },
    button_extern: {
        backgroundColor: '#ef0000',
        color: 'white',
        "&:hover": {
            backgroundColor: "#cae8d5",
            color: '#001c2f'
        }
    },
    buttons: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },

}));

export default class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activity: null,
            member: false,
            gdpr: false,
            name: '',
            email: '',
            phone: '',
            selectedType: '',
            registered: false,
        }
        this.activity_id = this.props.match.params.activityId;
    }

    getParams = () => {
        const { activity_id } = useParams();
        return activity_id;
    }

    componentDidMount() {
        const { history } = this.props;
        console.log("Props: ", this.props);
        if (!this.state.activity) {
            fetch(`https://api.amosed.ro/api/activities/${this.activity_id}`)
                .then(response => response.json())
                .then(json => {
                    if (json.length === 0) {
                        history.push('/');
                        return;
                    }
                    this.setState({ activity: json });
                })
                .catch(error => console.log(error));
        }
    }

    handleMemberChange = (event) => {
        this.setState({ member: event.target.checked });
    }

    handleGdprChange = (event) => {
        this.setState({ gdpr: event.target.checked });
    }

    renderPhone = () => {
        if (this.state.member) {
            return <div></div>
        }
        else {
            return (
                <TextField id="phone"
                    label="Numar de telefon"
                    fullWidth
                    onChange={event => this.setState({ phone: event.currentTarget.value })}
                    value={this.state.phone}
                />
            )
        }
    }


    renderEmail = () => {
        if (this.state.member) {
            return <div></div>
        }
        else {
            return (
                <TextField id="email"
                    label="Email"
                    fullWidth
                    onChange={event => this.setState({ email: event.currentTarget.value })}
                    value={this.state.email}
                />
            )
        }
    }

    register = () => {
        if (!this.state.gdpr) {
            alert("Nu putem înregistra acest formular până nu îţi dai consimţământul cu privire la politica de prelucrarea datelor personale")
            return;
        }
        const body = JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            activity_id: parseInt(this.activity_id, 10),
            activity_name: this.state.activity.activity_name,
            member: this.state.member ? 1 : 0,
            phone_number: this.state.phone,
            gdpr_agreement: this.state.gdpr ? 1 : 0,
        });
        fetch("https://api.amosed.ro/api/registration/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body,
            // mode: "no-cors"
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({ registered: true });
            })
            .catch(error => console.error(error));
    }

    GeneralForm = (classes) => {
        if (!this.state.member) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Completează formularul de mai jos</p> */}
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="name"
                            label="Nume si prenume"
                            fullWidth
                            onChange={event => this.setState({ name: event.currentTarget.value })}
                            value={this.state.name}
                        />

                        {this.renderPhone()}
                        {this.renderEmail()}

                        <FormControlLabel
                            style={{ marginTop: '2%', marginBottom: '1%' }}
                            control={
                                <Checkbox
                                    checked={this.state.gdpr}
                                    onChange={this.handleGdprChange}
                                    name="gdpr"
                                    color="primary"
                                />
                            }
                            label="Sunt de acord cu politica de prelucrare a datelor a AMoS ED"
                        />

                        <div>
                            <Button style={{ marginTop: '2%' }} onClick={() => this.register()} variant="contained" className={classes.button}>
                                Înscrie-te!
                            </Button>
                        </div>
                        {/* <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                    </form>
                </div>
            )
        }
        else {
            return <div></div>
        }
    }

    registerMember = (name, email) => {
        //we have: activity_id, activity_name in this.state.activity
        //we need email and the name of the participant
        //we will make a POST request to https://api.amosed.ro/api/users


        let body = {
            name: name,
            email: email,
            activity_id: parseInt(this.activity_id),
            activity_name: this.state.activity.activity_name,
            member: 1,
            gdpr: 1,
            activity_time: parseInt(this.state.activity.duration)
        }
        
        fetch("https://api.amosed.ro/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            cors: 'cors'
        })
        .then(response=>response.json())
        .then(json => {
            this.setState({ registered: true });
        })
        .catch(error => {
            console.error(error);
        })
    }

    GoogleLogin = () => {
        if (this.state.member) {
            return (
                <div>
                    <h3 style={{ textAlign: 'center' }}>Loghează-te cu contul tău de G Suite pentru a te înscrie la activitate</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Login success={this.registerMember} />
                    </div>
                </div>
            )
        }
        else {
            return <div></div>
        }
    }

    SuccessScreen = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CheckCircleOutlineIcon style={{ color: 'green', fontSize: 45 }} />
                <span style={{ fontSize: 25, fontWeight: "bold" }}>Te-ai înregistrat cu succes!</span>
            </div>
        )
    }

    

    MainScreen = () => {
        const classes = useStyles();
        if (this.state.registered) {
            return <this.SuccessScreen />
        }
        if (this.state.selectedType) {
            if (this.state.member) {
                return <this.GoogleLogin />
            }
            else return this.GeneralForm(classes)
        }
        else {
            return this.ChooseScreen(classes);
        }
    }

    chooseMoseador = () => {
        this.setState({ member: true, selectedType: true });
    }

    chooseExtern = () => {
        this.setState({ member: false, selectedType: true })
    }

    ChooseScreen = (classes) => {
        if (!this.state.selectedType) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={this.chooseMoseador} className={classes.button_moseador} variant="contained" color="primary" style={{ margin: '1%' }}>
                        Moseador
                    </Button>
                    <Button onClick={this.chooseExtern} className={classes.button_extern} variant="contained" color="primary" style={{ margin: '1%' }}>
                        Participant extern
                    </Button>
                </div>
            )
        }
        else {
            return <div></div>
        }
    }

    goBack = () => {
        this.setState({ selectedType: false });
    }

    render() {
        if (!this.state.activity) return <div></div>
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2%' }}>
                <div style={{ backgroundColor: 'white', width: '80%', padding: '3%' }}>
                    {this.state.selectedType && !this.state.registered && (
                        <IconButton aria-label="Înapoi" onClick={this.goBack}>
                            <ArrowBackIcon />
                        </IconButton>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={require('./img/logo-complet.png')} height={70} />
                    </div>

                    {!this.state.registered && (
                        <div>
                            <h1 style={{ textAlign: 'center' }}>Înscrie-te la activitate!</h1>
                            {!this.state.member && (
                                <p style={{ textAlign: 'center' }}>Pentru a te putea înregistra la {this.state.activity ? this.state.activity.activity_name : "această activitate"}, urmează paşii de mai jos</p>
                            )}
                        </div>
                    )}

                    <this.MainScreen />

                </div>
            </div>
        )
    }

}