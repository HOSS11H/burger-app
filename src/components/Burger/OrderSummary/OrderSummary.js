import React from 'react';

import Aux from '../../../hoc/Auxilliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

    const ingredientsList = Object.keys(props.ingredients)
        .map( igKey => {
            return (
                <li key={igKey}> <span style={ {textTransform: "capitalize"} }>{igKey}</span>:  {props.ingredients[igKey]}</li> 
            )});

    return (
        <Aux>
            <h3>your order</h3>
            <p>a delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsList}
            </ul>
            <p><strong>total price : {props.price.toFixed(2)} $</strong></p>
            <Button type='Success' clicked={props.submit} >continue</Button>
            <Button type='Danger' clicked={props.cancel}>cancel</Button>
        </Aux>
    );
};

export default OrderSummary;