import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

const months = [
    "",
    "Ianuarie",
    "Februarie",
    "Martie",
    "Aprilie",
    "Mai",
    "Iunie",
    "Iulie",
    "August",
    "Septembrie",
    "Octombrie",
    "Noiembrie",
    "Decembrie"
]


const useStyles = makeStyles({
    formControl: {
        backgroundColor: 'white',
        width: '80%'
    }
});

export default function MonthSelect({ updateMonth }) {

    const classes = useStyles();
    const [month, setMonth] = useState('');

    const updateMonthEvent = (event) => {
        console.log(event);
        setMonth(event.target.value);
        updateMonth(event.target.value);
    }

    return (
        <div style={{backgroundColor: 'white'}}>
            <Grid container spacing={0}>
                <Grid item xs={0} lg={2}>
                    <h3 style={{textAlign: 'center'}}>Selecteaza luna</h3>
                </Grid>
                <Grid item xs={12} lg={10} style={{display: 'flex', justifyContent: 'center'}}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Luna...</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={month}
                            onChange={(event) => updateMonthEvent(event)}
                        >
                            {months.map((m, i) => {
                                if (i !== 0) {
                                    return <MenuItem value={m}>{m}</MenuItem>
                                }
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )

}