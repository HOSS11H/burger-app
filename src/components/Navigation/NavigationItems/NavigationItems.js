import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>burger builder</NavigationItem>
        <NavigationItem link='/orders' >orders</NavigationItem>
    </ul>
);

export default NavigationItems;