import React from "react";

import classes from "./BuildControl.module.css";

const BuildControl = (props) => {

    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Less} 
            onClick = { ( ) => props.removed(props.label) }
            disabled= {props.disabled}>less</button>
            <button className={classes.More} onClick = { ( ) => props.added(props.label) }>more</button>
        </div>
    );
};
export default BuildControl;