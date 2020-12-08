import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MonthSelect from "./MonthSelect";
import Grid from '@material-ui/core/Grid'
import FormFields from './FormFields';
import ReportField from './ReportField';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

export default class EditareRaport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            month: "",
            data: [new ReportField()],
            selfDevData: [new ReportField()]
        }
    }

    updateMonth = (month) => {
        this.setState({ month: month });
    }

    selectMonth = () => {
        return (
            <MonthSelect updateMonth={this.updateMonth} />
        )
    }

    updateFields = (newField, index) => {
        this.state.data[index] = newField;
        this.setState({ data: this.state.data });
        console.log(newField);
    }

    ReportField = () => {
        return (
            <div>
                {this.state.data.map((actField, index) => {
                    return (
                        <FormFields onChangeFields={this.updateFields} index={index} field={actField} />
                    )
                })}
            </div>
        )
    }

    updateSelfDevField = (newField, index) => {
        this.state.selfDevData[index] = newField;
        this.setState({ selfDevData: this.state.selfDevData });
        console.log(this.state.selfDevData);
    }

    SelfDevFields = () => {
        return (
            <div>
                {this.state.selfDevData.map((actField, index) => {
                    return (
                        <FormFields onChangeFields={this.updateSelfDevField} index={index} field={actField} />
                    )
                })}
            </div>
        )
    }

    addNewField = () => {
        this.state.data.push(new ReportField());
        this.setState({ data: this.state.data });
    }

    addNewLearningField = () => {
        this.state.selfDevData.push(new ReportField());
        this.setState({ selfDevData: this.state.selfDevData });
    }

    postActivities = () => {
        return (
            <div>
                <div style={{ width: '100%', padding: '1%' }}>
                    <this.ReportField />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button onClick={this.addNewField}>
                        <AddIcon style={{ backgroundColor: 'white', borderRadius: '50%' }} />
                        <p>Adaugă o activitate</p>
                    </Button>
                </div>
            </div>
        )
    }

    selfDevFields = () => {
        return (
            <div>
                <div style={{ width: '100%', padding: '1%' }}>
                    <this.SelfDevFields />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button onClick={this.addNewLearningField}>
                        <AddIcon style={{ backgroundColor: 'white', borderRadius: '50%' }} />
                        <p>Adaugă o activitate</p>
                    </Button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <center>
                <div style={{ width: '80%' }}>
                    <p style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: 'white' }}>Editare raport de activitate</p>
                    <div style={{ backgroundColor: 'white' }}>
                        {this.selectMonth()}
                        <h2>Activitati aferente postului</h2>
                        {this.postActivities()}
                        <Divider />
                        <h2>Implicare in dezvoltarea personala</h2>
                        {this.selfDevFields()}
                    </div>
                </div>
            </center>
        )
    }

}