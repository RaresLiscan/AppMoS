import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';


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
    }
}));

export default function Registration(props) {

    const [activity, setActivity] = useState(null);
    const [member, setIsMember] = useState(false);
    const [gdpr, setGdpr] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const classes = useStyles();

    let { activityId } = useParams();

    useEffect(() => {
        if (!activity) {
            fetch(`https://api.amosed.ro/api/activities/${activityId}`)
                .then(response => response.json())
                .then(json => {
                    setActivity(json);
                })
                .catch(error => console.log(error));
        }
    })

    const handleMemberChange = (event) => {
        setIsMember(event.target.checked);
    }

    const handleGdprChange = (event) => {
        setGdpr(event.target.checked);
    }

    const renderPhone = () => {
        if (member) {
            return <div></div>
        }
        else {
            return (
                <TextField id="phone"
                    label="Numar de telefon"
                    fullWidth
                    onChange={event => setPhone(event.currentTarget.value)}
                    value={phone}
                />
            )
        }
    }


    const renderEmail = () => {
        if (member) {
            return <div></div>
        }
        else {
            return (
                <TextField id="email"
                    label="Email"
                    fullWidth
                    onChange={event => setEmail(event.currentTarget.value)}
                    value={email}
                />
            )
        }
    }

    const register = () => {
        if (member) {
            setEmail('');
            setPhone('');
        }
        if (!gdpr) {
            alert("Nu putem înregistra acest formular până nu îţi dai consimţământul cu privire la politica de prelucrarea datelor personale")
            return;
        }
        const body = JSON.stringify({
            name: name,
            email: email,
            activity_id: parseInt(activityId, 10),
            activity_name: activity.activity_name,
            member: member ? 1 : 0,
            phone_number: phone,
            gdpr_agreement: gdpr ? 1 : 0,
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
            })
            .catch(error => console.error(error));
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2%'}}>
            <div style={{backgroundColor: 'white', width: '80%', padding: '3%'}}>
                <div style={{display: 'flex', justifyContent: 'center' }}>
                    <img src={require('./img/logo-complet.png')} height={70} />
                </div>
                <h1 style={{ textAlign: 'center' }}>Înscrie-te la activitate!</h1>
                <p style={{textAlign: 'center' }}>Pentru a te putea înregistra la {activity ? activity.activity_name : "această activitate"}, completează formularul de mai jos</p>
                <div >
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="name"
                            label="Nume si prenume"
                            fullWidth
                            onChange={event => setName(event.currentTarget.value)}
                            value={name}
                        />
                        <FormControlLabel
                        style={{marginTop: '2%'}}
                            control={
                                <Checkbox
                                    checked={member}
                                    onChange={handleMemberChange}
                                    name="member"
                                    color="primary"
                                />
                            }
                            label="Moseador?"
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
                            label="Sunt de acord cu politica de prelucrare a datelor a AMoS ED"
                        />

                        <div>
                            <Button style={{marginTop: '2%'}} onClick={() => register()} variant="contained" className={classes.button}>
                                Înscrie-te!
                            </Button>
                        </div>
                        {/* <TextField id="filled-basic" label="Filled" variant="filled" />
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
                    </form>
                </div>
            </div>
        </div>
    )

}