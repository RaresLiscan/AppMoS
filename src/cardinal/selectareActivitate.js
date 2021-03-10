import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {colors} from "../colors";
import {Link} from "react-router-dom";
import {Button} from "@material-ui/core";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
    paper: {
        margin: '5%',
        padding: '2%',
        minHeight: 200,
        maxWidth: 600,
    },
    button: {
        backgroundColor: colors.blue5,
        color: 'white',
        margin: '1%',
        '&:hover': {
            backgroundColor: colors.red,
        }
    },
    gridItem: {
        display: 'flex',
        justifyContent: 'center'
    },
    form: {
        width: '100%'
    }
})


export default function SelectareActivitate() {

    const [actId, setActId] = useState('0');

    const classes = useStyles();

    //TODO: Introduce numarul activitatii si il duce la pagina cu activitatea
    const history = useHistory();

    const setActivityId = (id) => {
        history.push(`/activity/${id}`);
    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Paper variant={"outlined"} elevation={3} className={classes.paper}>
                <h1 style={{textAlign: 'center'}}>Introdu codul activității</h1>
                <p style={{textAlign: 'center'}}>În câmpul de mai jos tastează codul pe care l-ai primit de la organizatori pentru a te putea înscrie în activitate.</p>
                <form className={classes.root} noValidate autoComplete="off" style={{textAlign: 'center'}}>
                    <TextField id="filled-basic" label="Codul evenimentului..." variant="filled" className={classes.form} onChange={event => setActId(event.currentTarget.value)} />
                </form>
                <Link to={`/${actId}`} style={{display: 'flex', justifyContent: 'center', textDecoration: 'none'}}>
                    <Button className={classes.button} onClick={() => setActivityId(actId)}>Cauta</Button>
                </Link>
            </Paper>
        </div>
    )

}