import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {

    let InputElement = null;
    let inputClasses = [classes.InputElement]
    let validationError = null;

    
    if(props.inValid && props.touched && props.shouldValidate) {
        inputClasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>please Check your data again </p>
    }

    switch ( props.elementType ) {
        case ( 'input' ) :
            InputElement = <input className = {inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value} onChange={props.changed} />;
            break;
        case ( 'textarea' ) : 
            InputElement = <textarea className = {inputClasses.join(' ')} 
                    {...props.elementConfig} 
                    value={props.value} onChange={props.changed} />
            break;
        case ( 'select' ) : 
            InputElement = (
                <select className = {inputClasses.join(' ')} value={props.value} onChange={props.changed} >
                    {   props.elementConfig.options.map( option => {
                            return <option key={option.value} value={option.value} >{option.displayValue}</option>
                        })
                    }
                </select>
            )
            break;
        default :
            InputElement = <input className = {classes.InputElement} 
                    {...props.elementConfig} 
                    value={props.value} onChange={props.changed} />;
    }

    

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {InputElement}
            {validationError}
        </div>
    )
}
export default Input;