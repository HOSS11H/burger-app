import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We Hope It Tastes Well</h1>
            <div>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button type='Danger' clicked={props.cancelHandler}>Cancel</Button>
            <Button type='Success' clicked={props.continueHandler}>Continue</Button>
        </div>
    )
}
export default CheckoutSummary;