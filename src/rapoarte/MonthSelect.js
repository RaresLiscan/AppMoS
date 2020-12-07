import React, {useState} from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {makeStyles} from "@material-ui/core/styles";

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

});

export default function MonthSelect({ updateMonth }) {

    const classes = useStyles();
    const [month, setMonth] = useState('');

    const updateMonthEvent = (event) => {
        setMonth(event.currentTarget.value);
        updateMonth(event.currentTarget.value);
    }

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    onChange={(event) => updateMonth(event)}
                >
                    {months.map(m => {
                        return <MenuItem value={m}>{m}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    )

}