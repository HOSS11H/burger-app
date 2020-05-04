import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";

const BuildControls = (props) => {
    // Controls Passed On The State Of The Burger Builder
    const controls = Object.keys(props.ingredients);

    const controlsList =controls.map( (ctrl , index) => {
        return <BuildControl 
                            label= {ctrl} 
                            key= {index} 
                            added={ props.ingredientAdded }
                            removed={ props.ingredientRemoved } 
                            disabled = { props.disabledInfo[ctrl] }/> ;
    });

    return (
        <div className={classes.BuildControls}>
            <p>Current Price : {props.price.toFixed(2)}</p>
            {controlsList}
            <button className={classes.OrderButton} 
            disabled={!props.purshasable}
            onClick={props.summaryShow}>Order Now</button>
        </div>
    );
};
export default BuildControls;