import React, {useState, useEffect} from 'react';
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
        width: '80%',
        margin: '0% 2%',
    }
});

export default function MonthSelect({ updateMonth, updateYear }) {

    const classes = useStyles();
    const [month, setMonth] = useState('');
    const [years, setYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');

    useEffect(() => {
        if (years.length === 0) {
            generateYears();
        }
    });

    //Pune intr-un array toti anii specificati
    //array-ul rezultat va fi folosit in meniul de selectare al anului
    const generateYears = () => {
        let yearArray = [];
        for (var i = 2019; i <= 2021; i ++) {
            yearArray.push(i);
        }
        setYears(yearArray);
    }

    //Actualizeaza in state luna si face callback in componentul mai mare
    const updateMonthEvent = (event) => {
        setMonth(event.target.value);
        updateMonth(event.target.value);
    }

    //Actualizeaza anul in state si face callback in componentul mare
    const updateYearEvent = (event) => {
        setSelectedYear(event.target.value);
        updateYear(event.target.value.toString());
    }

    return (
        <div style={{backgroundColor: 'white'}}>
            <Grid container spacing={0}>
                <Grid item xs={false} lg={2}>
                    <h4 style={{textAlign: 'center'}}>Selecteaza luna si anul</h4>
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
                                    return <MenuItem key={m} value={m}>{m}</MenuItem>
                                }
                            })}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Anul...</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedYear}
                            onChange={(event) => updateYearEvent(event)}
                        >
                            {years.map((y, i) => {
                                if (i !== 0) {
                                    return <MenuItem key={y} value={y}>{y}</MenuItem>
                                }
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )

}