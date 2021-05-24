import React from 'react';
import {useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Login from './login';
import logoComplet from '../../img/logo-complet.png';


const API_URL = "http://localhost/amos-api/api";

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

function GetClasses() {
    return useStyles();
}

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
            selectedType: true,
            registered: false,
        }
        this.activity_id = this.props.match.params.activityId;
        console.log(this.activity_id);
    }

    componentWillMount() {
        const {history} = this.props;
        console.log("History Props: ", this.props);
        console.log("Fetching activity details...");
        if (!this.state.activity) {
            // fetch(`https://api.amosed.ro/api/activities/${this.activity_id}`)
            fetch(`${API_URL}/activities/${this.activity_id}`)
                .then(response => response.json())
                .then(json => {
                    console.log("ACTIVITY DETAILS SERVER RESPONSE: ", json);
                    if (json.length !== 0) {
                        this.setState({activity: json});
                    }
                    else {
                        throw new Error("There was an error retrieving activity details");
                    }
                })
                .catch(error => console.error(error));
        }
    }

    handleMemberChange = (event) => {
        this.setState({member: event.target.checked});
    }

    handleGdprChange = (event) => {
        this.setState({gdpr: event.target.checked});
    }

    renderPhone = () => {
        return (
            <TextField id="phone"
                       label="Numar de telefon"
                       fullWidth
                       onChange={event => this.setState({phone: event.currentTarget.value})}
                       value={this.state.phone}
            />
        )
    }


    renderEmail = () => {
        return (
            <TextField id="email"
                       label="Email"
                       fullWidth
                       onChange={event => this.setState({email: event.currentTarget.value})}
                       value={this.state.email}
            />
        )
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
        fetch(`${API_URL}/api/registration/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body,
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({registered: true});
            })
            .catch(error => console.error(error));
    }

    LabelComponent = () => {
        return (
            <p>
                Sunt de acord cu <a href={"https://www.amosed.ro/wp-content/uploads/2020/11/GDPR-Doc_.docx.pdf"}
                                    target={"_blank"}>politica de confidențialitate cu privire la prelucrarea datelor cu
                caracter personal</a>
            </p>
        )
    }

    GeneralForm = (classes) => {
        console.log("RENDERING GENERAL FORM SCREEN...");
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                {/* <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Completează formularul de mai jos</p> */}
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="name"
                               label="Nume si prenume"
                               fullWidth
                               onChange={event => this.setState({name: event.currentTarget.value})}
                               value={this.state.name}
                    />

                    {this.renderPhone()}
                    {this.renderEmail()}

                    <FormControlLabel
                        style={{marginTop: '2%', marginBottom: '1%'}}
                        control={
                            <Checkbox
                                checked={this.state.gdpr}
                                onChange={this.handleGdprChange}
                                name="gdpr"
                                color="primary"
                            />
                        }
                        label={<this.LabelComponent/>}
                    />

                    <div>
                        <Button style={{marginTop: '2%'}} onClick={() => this.register()} variant="contained"
                                className={classes.button}>
                            Înscrie-te!
                        </Button>
                    </div>
                </form>
            </div>
        )
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
            .then(response => response.json())
            .then(json => {
                this.setState({registered: true});
            })
            .catch(error => {
                console.error(error);
            })
    }

    GoogleLogin = () => {
        if (this.state.member) {
            return (
                <div>
                    <h3 style={{textAlign: 'center'}}>Loghează-te cu contul tău de G Suite pentru a te înscrie la
                        activitate</h3>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Login success={this.registerMember}/>
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    SuccessScreen = () => {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <CheckCircleOutlineIcon style={{color: 'green', fontSize: 45}}/>
                <span style={{fontSize: 25, fontWeight: "bold"}}>Te-ai înregistrat cu succes!</span>
            </div>
        )
    }


    MainScreen = () => {
        const classes = GetClasses();
        if (this.state.registered) {
            return <this.SuccessScreen/>
        }
        if (this.state.selectedType) {
            if (this.state.member) {
                return <this.GoogleLogin/>;
            }
            else {
                return this.GeneralForm(classes);
            }
        } else {
            return this.ChooseScreen(classes);
        }
    }

    chooseMoseador = () => {
        this.setState({member: true, selectedType: true});
    }

    chooseExtern = () => {
        this.setState({member: false, selectedType: true})
    }

    ChooseScreen = (classes) => {
        if (!this.state.selectedType) {
            return (
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={this.chooseMoseador} className={classes.button_moseador} variant="contained"
                            color="primary" style={{margin: '1%'}}>
                        Moseador
                    </Button>
                    <Button onClick={this.chooseExtern} className={classes.button_extern} variant="contained"
                            color="primary" style={{margin: '1%'}}>
                        Participant extern
                    </Button>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    goBack = () => {
        this.setState({selectedType: false});
    }

    render() {
        console.log("Activity Object: ", this.state.activity);
        if (!this.state.activity) return <div></div>
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2%'}}>
                <div style={{backgroundColor: 'white', width: '80%', padding: '3%'}}>
                    {this.state.selectedType && !this.state.registered && (
                        <IconButton aria-label="Înapoi" onClick={this.goBack}>
                            <ArrowBackIcon/>
                        </IconButton>
                    )}
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        {/*<img src={require('./img/logo-complet.png')} alt={"Logo AMoS ED"} height={70} />*/}
                        <img src={logoComplet} alt={"Logo AMoS ED"} height={70}/>
                    </div>

                    {!this.state.registered && (
                        <div>
                            <h1 style={{textAlign: 'center'}}>Înscrie-te la activitate!</h1>
                            {!this.state.member && (
                                <p style={{textAlign: 'center'}}>Pentru a te putea înregistra
                                    la {this.state.activity ? this.state.activity.activity_name : "această activitate"},
                                    urmează paşii de mai jos</p>
                            )}
                        </div>
                    )}

                    <this.MainScreen/>

                </div>
            </div>
        )
    }

}