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
import generatePDF from './reportGenerator';
import SubmitButtons from './SubmitButtons';
import ReportOperations from './reportsOps';
import authProvider from '../account/authProvider';

export default class EditareRaport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            year: '',
            month: "",
            newChange: false//pentru auto-updates, variabila ne indica daca exista vreo schimbare noua
        }
        this.data = [[new ReportField()], [new ReportField()]];//toate activitatile aferente postului
        this.selfDevData = [new ReportField()];//toate activitatile pentru dezvoltarea personala
        // this.update = setInterval(() => {
        //     if (this.state.newChange) {
        //         this.updateUserReport();
        //         this.setState({newChange: false});
        //     }
        // }, 5000);
    }

    downloadPdf = () => {
        generatePDF(this.data[0], this.data[1]);
    }

    componentWillUnmount() {
        // this.updateUserReport();
        // clearInterval(this.update);
    }

    updateUserReport = () => {
        if (this.state.newChange) {
            ReportOperations.addActivity(this.data, this.selfDevData)
                .then(response => {
                    console.log(response);
                })
                .catch(error => console.log(error));
        }
    }

    getDbData = () => {
        //TODO: request-uri din sql
        console.log("Data updated");
    }

    updateMonth = (month) => {
        //update din componentul MonthSelect
        this.setState({ month: month });
        this.getDbData();
    }
    
    updateYear = (year) => {
        //update din componentul MonthSelect
        this.setState({ year: year });
        this.getDbData();
    }

    selectMonth = () => {
        return (
            <MonthSelect updateMonth={this.updateMonth} updateYear={this.updateYear} />
        )
    }

    updateFields = (newField, index, type) => {
        this.data[type][index] = newField;
        this.setState({newChange: true});
    }

    //Field-urile pentru activitati aferente postului
    ReportField = (type) => {
        return (
            <div>
                {/* pentru fiecare activitate din dezvoltarea personala randam un FormField */}
                {this.data[type].map((actField, index) => {
                    return (
                        <FormFields key={index} onChangeFields={this.updateFields} index={index} field={actField} type={type} />
                    )
                })}
            </div>
        )
    }

    //Functia apelata cand se apasa butonul de adaugare activitate la act. aferente postului
    addNewField = (type) => {
        this.data[type].push(new ReportField());
        this.setState({ newChange: true });
    }

    postActivities = (type) => {
        return (
            <div>
                <div style={{ width: '100%', padding: '1%' }}>
                    {this.ReportField(type)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button onClick={() => this.addNewField(type)}>
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
                    <div style={{ backgroundColor: 'white', padding: '2%' }}>
                        {this.selectMonth()}
                        {this.state.month.length > 0 && this.state.year.length > 0 ? (
                            <div>
                                <h2>Activitati aferente postului</h2>
                                {this.postActivities(0)}
                                <Divider />
                                <h2>Implicare in dezvoltarea personala</h2>
                                {this.postActivities(1)}
                                <div>
                                    <SubmitButtons saveChanges={this.updateUserReport} downloadPdf={this.downloadPdf} />
                                </div>
                            </div>
                        ) : (<div></div>)}
                    </div>
                </div>
            </center>
        )
    }

}