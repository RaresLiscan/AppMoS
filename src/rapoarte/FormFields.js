import React, { useState, useRef, useEffect } from 'react';
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
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        // width: 200,
        marginLeft: 10,
        marginRight: 10,
    },

}))
// let field = new ReportField();
export default function FormFields({ onChangeFields, field, index, type, editable, deleteItem, submitted }) {

    const classes = useStyles();
    const [update, setUpdate] = useState(true);

    const deleteThisItem = () => {
        deleteItem();
    }

    const updateTitle = (newTitle) => {
        setUpdate(!update);
        field.setName(newTitle);
        onChangeFields(field, index, type);
    }

    const updateProject = (project) => {
        setUpdate(!update);
        field.setProject(project);
        onChangeFields(field, index, type);
    }

    const updateDate = (date) => {
        setUpdate(!update);
        field.setDate(date);
        onChangeFields(field, index, type);
    }

    const updateWorkTime = (newTime) => {
        let isnum = /^\d+$/.test(newTime);
        if (isnum || newTime.length === 0) {
            setUpdate(!update);
            field.setTime(newTime);
            onChangeFields(field, index, type);
        }
    }

    return (
        <div style={{ width: '100%' }}>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <TextField disabled={!editable} value={field.name}
                            error={editable && submitted && field.name.length === 0}
                            helperText="Câmp obligatoriu"
                            className={classes.textField}
                            onChange={(event) => updateTitle(event.target.value)}
                            label="Nume activitate" variant="filled" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            error={editable && submitted && field.project.length === 0}
                            helperText={"Câmp obligatoriu"}
                            className={classes.textField}
                            disabled={!editable}
                            value={field.project}
                            onChange={event => updateProject(event.target.value)}
                            label="Nume proiect" variant="filled" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        {/* <TextField value={date}
                        onChange={event => updateDate(event.target.value)} 
                        label="Data" variant="filled" /> */ }
                        <div className={classes.container} style={{display: 'flex', justifyContent:'center'}}>
                            <TextField
                                id="date"
                                label="Data" variant="filled"
                                helperText="Câmp obligatoriu"
                                type="date"
                                defaultValue="2021-01-01"
                                disabled={!editable}
                                value={field.date}
                                onChange={event => updateDate(event.target.value)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            error={editable && submitted && (field.time.length === 0 || parseInt(field.time) === 0)}
                            helperText="Câmp obligatoriu"
                            value={field.time}
                            disabled={!editable}
                            className={classes.textField}
                            onChange={(event) => updateWorkTime(event.target.value)}
                            label="Durata (in minute)" variant="filled" />
                    </Grid>
                    <Grid item xs={12} md={1}>
                        <Button disabled={!editable} onClick={() => deleteThisItem()}>
                            <DeleteOutlineOutlinedIcon />
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </div>
    )

}