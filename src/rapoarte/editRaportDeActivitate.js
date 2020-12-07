import React from 'react';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import MonthSelect from "./MonthSelect";


export default class EditareRaport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            month: "Ianuarie"
        }
    }

    //TODO: Selectare luna

    updateMonth = (month) => {
        this.setState({month: month});
    }

    selectMonth = () => {
        return (
            <MonthSelect updateMonth={this.updateMonth}/>
        )
    }

    //TODO: component field-uri

    render() {
        return (
            <div>
                <p>Editare raport de activitate</p>
                {this.selectMonth()}
            </div>
        )
    }

}