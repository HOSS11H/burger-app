import React from "react";


import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
    let transformedIngredients = Object.keys( props.ingredients )
        .map( igKey => {
            // We Return Num Of Arrays Based On The Value. and put them in one array and map() through it.
            return [...Array( props.ingredients[igKey] )].map( ( _, i ) => {
                // We Use 
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            } );
        } )
        // We Got Array Of Arrays (Arrays Of JSX Elements) => [  [ ] , [ ] , [ ] ]
        // We loop Through them and put them in one Array 
        .reduce((arr, el) => {
            // We Flatten The Array
            return arr.concat(el);
            // So We Got => [ { } , { } , { }]
        }, []);
    // So We Can Check If The Array Is Empty Or Not
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default Burger;
