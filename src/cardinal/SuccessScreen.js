import React from 'react';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';
import { colors } from '../colors';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
    button: {
        backgroundColor: colors.blue5,
        color: 'white',
        '&:hover': {
            backgroundColor: colors.red
        }
    }
})

export default function SuccessScreen() {

    const classes = useStyles();
    const history = useHistory();

    return (
        <div style={{backgroundColor: 'white', margin: '3%', padding: '5% 3%'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <CheckCircleOutlineIcon style={{color: 'green', fontSize: 45}}/>
                <span style={{fontSize: 25, fontWeight: "bold"}}>Te-ai înregistrat cu succes!</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2%'}}>
                <Button className={classes.button} onClick={() => history.goBack()}>Inapoi la pagina principala</Button>
            </div>
        </div>
    )

}