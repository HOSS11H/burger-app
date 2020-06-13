import React from 'react';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Auxilliary';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const SideDrawer = (props) => {
    let attachedClasses = [];
    props.opened ? attachedClasses = classes.Open : attachedClasses = classes.Close
    return (
        <Aux>
            <Backdrop show={props.opened} remove={props.event} />
            <div className={ [ classes.SideDrawer , attachedClasses ].join(' ') } onClick={props.event}>
                <div className={classes.Logo}> 
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.authentication} />
                </nav>
            </div>

        </Aux>
    );    
};

export default SideDrawer;