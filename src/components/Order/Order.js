import React from 'react';

import Classes from './Order.module.css';

const Order = (props) => {
    let transformedIngredients = [];
    
    for (let ingredient in props.ingredients) {
        transformedIngredients.push({name: ingredient, amount: props.ingredients[ingredient]});
    }

    let yourOrder = transformedIngredients.map((ig ,index) => {
        if (ig.amount === 0 ) {
            return false
        } else {
            return <span key={index} 
                            style={
                                {
                                    textTransform: "capitalize",
                                    display: 'inline-block',
                                    margin: '0 8px',
                                    border: '1px solid #ccc',
                                    padding: '5px'
                                }
                            }> {ig.name} = {ig.amount} </span>
        }
    })

    console.log(transformedIngredients)
    return (
        <div className={Classes.Order}>
            <p>ingredients: {yourOrder} </p>
            <p>Price:  <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}
export default Order;