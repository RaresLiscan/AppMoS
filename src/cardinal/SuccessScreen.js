import React from 'react';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

export default function SuccessScreen() {

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <CheckCircleOutlineIcon style={{color: 'green', fontSize: 45}}/>
            <span style={{fontSize: 25, fontWeight: "bold"}}>Te-ai înregistrat cu succes!</span>
        </div>
    )

}