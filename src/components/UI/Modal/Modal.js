import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxilliary';


const Modal = (props) => {

    let assignedClasses = [ ];
    assignedClasses.push(classes.Modal);

    if (props.show) {
        assignedClasses.push(classes.Active);
    } 
    
    return (
        <Aux>
            <Backdrop show={props.show} remove={props.hide} />
            <div className={assignedClasses.join(' ')}>
                {props.children}
            </div>
        </Aux>
    )
};

export default Modal;