import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ReportField from './ReportField';

const useStyles = makeStyles({
    root: {
        margin: 10,
        // width: '25ch',
    }
})
// let field = new ReportField();
export default function FormFields({onChangeFields, field, index}) {

    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [project, setProject] = useState('');
    const [date, setDate] = useState("");
    const [workTime, setWorkTime] = useState(0);

    const updateTitle = (newTitle) => {
        field.setTitle(newTitle);
        setTitle(newTitle);
        onChangeFields(field, index);
    }

    const updateProject = (project) => {
        field.setProject(project);
        setProject(project);
        onChangeFields(field, index);
    }

    const updateDate = (date) => {
        field.setDate(date);
        setDate(date);
        onChangeFields(field, index);
    }

    const updateWorkTime = (newTime) => {
        field.setTime(newTime);
        setWorkTime(newTime);
        onChangeFields(field, index);
    }

    return (
        <div style={{width: '100%'}}>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={0}>
                    <Grid item xs={12} md={3}>
                        <TextField value={title} 
                        onChange={(event) => updateTitle(event.target.value)} 
                        id="title" label="Nume activitate" variant="filled" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField 
                        value={project}
                        onChange={event => updateProject(event.target.value)}
                        id="project" label="Nume proiect" variant="filled" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField value={date}
                        onChange={event => updateDate(event.target.value)} 
                        id="date" label="Data" variant="filled" />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <TextField 
                        value={workTime}
                        onChange={(event) => updateWorkTime(event.target.value)}
                        id="workTime" label="Durata (in minute)" variant="filled" />
                    </Grid>
                </Grid>
            </form>
        </div>
    )

}