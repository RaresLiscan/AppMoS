import React from 'react';

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

export default class EditareRaport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            month: 1
        }
    }

    //TODO: Selectare luna

    selectMonth = () => {

    }

    //TODO: component field-uri

    render() {
        return (
            <div>
                <p>Editare raport de activitate</p>
            </div>
        )
    }

}