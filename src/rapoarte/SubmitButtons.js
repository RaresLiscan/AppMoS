import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core';
import {colors} from '../colors';

const useStyles = makeStyles({
    saveButton: {
        backgroundColor: colors.blue5,
        color: 'white',
        '&:hover': {
            backgroundColor: colors.red,
        }
    }
})

export default function SubmitButtons({ saveChanges, downloadPdf }) {

    const classes = useStyles();

    return (
        <div>
            {/* <div style={{display: 'flex', alignItems: 'flex-start', margin: '1%'}}>
                <Button onClick={() => saveChanges()} className={classes.saveButton}>Salvează modificările</Button>
            </div> */}
            <div style={{display: 'flex', alignItems: 'flex-start', margin: '1%'}}>
                <Button onClick={() => downloadPdf()} className={classes.saveButton}>Descarcă raportul</Button>
            </div>
            {/* <Grid container>
                <Grid item xs={12} md={6}>
                    
                </Grid>
                <Grid item xs={12} md={6}>
                    
                </Grid>
            </Grid>        */}
        </div>
    )
}