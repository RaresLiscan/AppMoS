import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Button from '@material-ui/core/Button';
import moment from "moment";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: 10,
        // width: '25ch',
    },
    inputRoot: {
        // position: "relative"
    },
    picker: {
        backgroundColor: 'gray',
    },
    // container: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    // },
    textField: {
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        // width: 200,
        marginLeft: 5,
        marginRight: 5,
        width: '90%'
    },
    dateField: {
        // marginLeft: 10,
        // marginRight: 10,
        width: '90%',
    },
    display: {
        // position: "absolute",
        // top: 2,
        // left: 0,
        // bottom: 2,
        background: "white",
        pointerEvents: "none",
        right: 50,
        display: "flex",
        alignItems: "center"
    },
    input: {}

}))

// let field = new ReportField();
export default function FormFields({ onChangeFields, field, index, type, editable, deleteItem, submitted }) {

    const classes = useStyles();
    const [update, setUpdate] = useState(true);

    const ref = useRef(null);

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
        // const newDate = date.substring(6, 10) + "-" + date.substring(3, 5) + "-" + date.substring(0, 2);
        field.setDate(date);
        onChangeFields(field, index, type);
        setUpdate(!update);
    }

    const updateWorkTime = (newTime) => {
        let isnum = /^\d+$/.test(newTime);
        if (isnum || newTime.length === 0) {
            setUpdate(!update);
            field.setTime(newTime);
            onChangeFields(field, index, type);
        }
    }

    const FormTextField=(props) => {
        return <TextField {...props} variant={"filled"}
                          helperText={"Obligatoriu"}
                          disabled={!editable}
                          className={classes.dateField}
                          label={"Data"}/>
    }

    return (
        <div style={{ width: '100%' }}>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={0} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <TextField ref={ref} disabled={!editable} value={field.name}
                            error={editable && submitted && field.name.length === 0}
                            helperText="Obligatoriu"
                            className={classes.textField}
                            onChange={(event) => updateTitle(event.target.value)}
                            label="Nume activitate" variant="filled" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            error={editable && submitted && field.project.length === 0}
                            helperText={"Obligatoriu"}
                            className={classes.textField}
                            disabled={!editable}
                            value={field.project}
                            onChange={event => updateProject(event.target.value)}
                            label="Nume proiect" variant="filled" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField
                            // id="date"
                            label="Data" variant="filled"
                            helperText="Obligatoriu"
                            type="date"
                            defaultValue="2021-01-01"
                            disabled={!editable}
                            value={field.date}
                            // formatDate={date => moment(date).format('DD/MM/YYYY')}
                            onChange={event => updateDate(event.target.value)}
                            className={classes.dateField}
                            // InputLabelProps={{
                            //     shrink: true,
                            //     // placeholder: "dd/mm/yyyy",
                            // }}
                        />
                        {/*<div className={classes.picker}>*/}
                        {/*    <KeyboardDatePicker*/}
                        {/*        // clearable*/}
                        {/*        value={field.date}*/}
                        {/*        placeholder="dd/MM/YYYY"*/}
                        {/*        onChange={(date, value) => updateDate(value)}*/}
                        {/*        format="dd/MM/yyyy"*/}
                        {/*        variant={"inline"}*/}
                        {/*        // TextFieldComponent={FormTextField}*/}
                        {/*        // className={classes.picker}*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            error={editable && submitted && (field.time.length === 0 || parseInt(field.time) === 0)}
                            helperText="Obligatoriu"
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