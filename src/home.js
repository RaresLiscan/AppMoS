import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button} from "@material-ui/core";
import {colors} from "./colors";
import {Link} from "react-router-dom";

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
    }
})

export default function Home() {

    const classes = useStyles();
    return (
        //TODO: Kinda dashboard cu ceea ce poate face userul
        //TODO: navigare catre acele pagini
        <div>
            <h1 style={{textAlign: 'center', color: 'white'}}>AppMoS ED</h1>
            <Grid container spacing={0}>
                <Grid item xs={12} lg={6} className={classes.gridItem}>
                    <Paper variant={"outlined"} elevation={3} className={classes.paper}>
                        <h1 style={{textAlign: 'center'}}>Rapoarte de activitate</h1>
                        <center>
                            <p>Raportul de activitate este dovada ta prin care ne arăți cât de mult ai muncit în luna aceasta. Completează-l aici</p>
                            <Link to={"/"}>
                                <Button variant={"contained"} className={classes.button}>Completează-ți raportul</Button>
                            </Link>
                        </center>
                    </Paper>
                </Grid>
                <Grid item xs={12} lg={6} className={classes.gridItem}>
                    <Paper variant={"outlined"} elevation={3} className={classes.paper}>
                        <h1 style={{textAlign: 'center'}}>Inscrie-te la o activitate</h1>
                        <center>
                            <p>Când participi la o activitate poți folosi această secțiune pentru a te înscrie virtual la aceasta. Cere organizatorilor codul activității, introdu-l și ai terminat</p>
                            <Link to={"/"}>
                                <Button variant={"contained"} className={classes.button}>Înscrie-te</Button>
                            </Link>
                        </center>
                    </Paper>
                </Grid>
            </Grid>

        </div>
    )
}