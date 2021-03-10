import React from 'react';
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
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
})

export default function SelectOption() {

    const classes = useStyle();

    const chooseMoseador = () => {

    }

    const chooseExtern = () => {

    }

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button onClick={chooseMoseador} className={classes.button_moseador} variant="contained"
                    color="primary" style={{margin: '1%'}}>
                Moseador
            </Button>
            <Button onClick={chooseExtern} className={classes.button_extern} variant="contained"
                    color="primary" style={{margin: '1%'}}>
                Participant extern
            </Button>
        </div>
    )
}