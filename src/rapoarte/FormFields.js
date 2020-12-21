import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10,
        // width: '25ch',
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },

}))
// let field = new ReportField();
export default function FormFields({ onChangeFields, field, index, type, editable, deleteItem }) {

    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [project, setProject] = useState('');
    const [date, setDate] = useState("");
    const [workTime, setWorkTime] = useState("");

    const updateTitle = (newTitle) => {
        setTitle(newTitle);
        field.setName(newTitle);
        onChangeFields(field, index, type);
    }

    const updateProject = (project) => {
        setProject(project);
        field.setProject(project);
        onChangeFields(field, index, type);
    }

    const updateDate = (date) => {
        console.log (date);
        setDate(date);
        field.setDate(date);
        onChangeFields(field, index, type);
    }

    const updateWorkTime = (newTime) => {
        let isnum = /^\d+$/.test(newTime);
        if (isnum || newTime.length === 0) {
            setWorkTime(newTime);
            field.setTime(newTime);
            onChangeFields(field, index, type);
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <TextField disabled={!editable} value={title}
                            onChange={(event) => updateTitle(event.target.value)}
                            label="Nume activitate" variant="filled" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            disabled={!editable}
                            value={project}
                            onChange={event => updateProject(event.target.value)}
                            label="Nume proiect" variant="filled" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {/* <TextField value={date}
                        onChange={event => updateDate(event.target.value)} 
                        label="Data" variant="filled" /> */ }
                        <form className={classes.container} noValidate style={{display: 'flex', justifyContent:'center'}}>
                            <TextField
                                id="date"
                                label="Data" variant="filled"
                                type="date"
                                defaultValue="2021-01-01"
                                disabled={!editable}
                                onChange={event => updateDate(event.target.value)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </form>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            value={workTime}
                            onChange={(event) => updateWorkTime(event.target.value)}
                            label="Durata (in minute)" variant="filled" />
                    </Grid>
                </Grid>
            </form>
        </div>
    )

}