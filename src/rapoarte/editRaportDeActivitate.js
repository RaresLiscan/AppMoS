import React from 'react';
import MonthSelect from "./MonthSelect";
import FormFields from './FormFields';
import ReportField from './ReportField';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import generatePDF from './reportGenerator';
import SubmitButtons from './SubmitButtons';
import ReportOperations from './reportsOps';
import authProvider from '../account/authProvider';

const COMPLETION_DAYS = 45;

export default class EditareRaport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            year: -1,
            month: -1,
            newChange: false,//pentru auto-updates, variabila ne indica daca exista vreo schimbare noua
            editable: false,
            submitted: false,
        }
        this.data = [
            [new ReportField("", "", "", "", this.formatDate(new Date), 0, 0)], 
            [new ReportField("", "", "", "", this.formatDate(new Date), 0, 1)]
        ];//toate activitatile aferente postului
        this.report = null;
    }

    downloadPdf = () => {
        this.updateReportDb();
        generatePDF(this.data[0], this.data[1], authProvider.getUser().name, this.state.month);
    }

    updateReportDb = () => {
        this.setState({submitted: true});
        ReportOperations.addActivity(this.data, this.state.month, this.state.year)
                .then(response => {
                    this.data = [[], []];
                    response.map((act,index) => {
                        this.data[parseInt(act.type)].push(new ReportField(
                            act.id,
                            act.reportId,
                            act.name,
                            act.project,
                            act.date.length > 0 ? act.date : this.formatDate(new Date()),
                            act.time,
                            parseInt(act.type)
                        ));
                    });
                    this.setState({newChange: !this.state.newChange});
                })
                .catch(error => console.log(error));
    }

    updateUserReport = () => {
        if (this.state.newChange) {
            this.updateReportDb();
            this.setState({newChange:false});
        }
    }


    getDbData = (month, year) => {
        if (month !== -1 && year !== -1) {
            this.data = [[], []];
            ReportOperations.getReportActivities(month, year)
                .then(async response => {
                    if (response.length > 0) {
                        this.report = response[0].reportId;
                        await response.map(act => {
                            this.data[parseInt(act.type)].push(new ReportField(
                                act.id,
                                act.reportId,
                                act.name,
                                act.project,
                                act.date.length > 0 ? act.date : this.formatDate(new Date()),
                                act.time,
                                parseInt(act.type),
                            ))
                        })
                    }
                    else {
                        this.data = [
                            [new ReportField("", "", "", "", this.formatDate(new Date), 0, 0)], 
                            [new ReportField("", "", "", "", this.formatDate(new Date), 0, 1)]
                        ];
                    }
                    this.setState({newChange: !this.state.newChange});
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }

    checkIfEditable = (month, year) => {
        // const today = new Date();
        // const reportDate = new Date(year, month, 1);
        // const diffTime = Math.abs(today - reportDate);
        // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.setState({ editable: true });
        // if (diffDays > COMPLETION_DAYS || diffTime < 0) {
        //     this.setState({ editable: false });
        // }
        // else {
        //     this.setState({ editable: true });
        // }
    }

    updateMonth = (month) => {
        //update din componentul MonthSelect
        this.getDbData(month, this.state.year);
        this.checkIfEditable(month - 1, this.state.year);
        this.setState({ month: month });
    }

    updateYear = (year) => {
        //update din componentul MonthSelect
        this.getDbData(this.state.month, year);
        this.checkIfEditable(this.state.month - 1, year);
        this.setState({ year: year });
    }

    selectMonth = () => {
        return (
            <MonthSelect updateMonth={this.updateMonth} updateYear={this.updateYear} />
        )
    }

    updateFields = (newField, index, type) => {
        this.data[type][index] = newField;
        this.setState({ newChange: true });
    }

    deleteItem = (index, type) => {
        if (this.data[type][index].id.length > 0) {
            ReportOperations.deleteField(this.data[type][index].id)
            .then(() => {
                
            })
            .catch(error => {
                console.log(error);
            })
        }
        this.data[type].splice(index, 1);
        this.setState({ newChange: true });
        // this.state.data[type].remove(index) sau ceva de genul asta
    }

    renderField = (index, type, actField) => {
        return (
            <FormFields key={`${index}/${type}`} submitted={this.state.submitted} key={index} editable={this.state.editable} deleteItem={() => this.deleteItem(index, type)} onChangeFields={this.updateFields} index={index} field={actField} type={type} />
        )
    }

    //Field-urile pentru activitati aferente postului
    ReportField = (type) => {
        return (
            <div>
                {/* pentru fiecare activitate randam un FormField */}
                {this.data[type].map((actField, index) => {
                    return (
                        <div>
                            {this.renderField(index, type, actField)}
                        </div>
                    )
                })}
            </div>
        )
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    //Functia apelata cand se apasa butonul de adaugare activitate la activitati
    addNewField = (type) => {
        this.data[type].push(new ReportField("", this.report, "", "", this.formatDate(new Date()), 0, type ));
        this.setState({ newChange: true, submitted: false });
    }

    postActivities = (type) => {
        return (
            <div>
                <div style={{ width: '100%', padding: '1%' }}>
                    {this.ReportField(type)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button disabled={!this.state.editable} onClick={() => this.addNewField(type)}>
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
                    <p style={{ textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: 'white' }}>
                        {this.state.editable ? "Editare raport de activitate" : "Vizualizare raport de activitate"}
                    </p>
                    <div style={{ backgroundColor: 'white', padding: '2%' }}>
                        {this.selectMonth()}
                        {this.state.month > 0 && this.state.year > 0 ? (
                            <div>
                                <h2>Activitati aferente postului</h2>
                                {this.postActivities(0)}
                                <Divider />
                                <h2>Implicare in dezvoltarea personala</h2>
                                {this.postActivities(1)}
                                <div>
                                    <SubmitButtons saveChanges={this.updateReportDb} downloadPdf={this.downloadPdf} />
                                </div>
                            </div>
                        ) : (<div></div>)}
                    </div>
                </div>
            </center>
        )
    }

}