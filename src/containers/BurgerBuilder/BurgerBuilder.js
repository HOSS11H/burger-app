import React from "react";
//import classes from "./BurgerBuilder.module.css"
import Aux  from "../../hoc/Auxilliary";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from "../../components/UI/Spinner/Spinner";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.8,
    bacon: 0.7,
    meat: 1.5
};

class BurgerBuilder extends React.Component {

    state = {
        ingredients: null ,
        totalPrice: 4,
        purshasable: false,
        purshasing: false,
        loading: false,
        pageError: false
    };
    
    componentDidMount = () => {
        axios.get('/ingredients.json')
            .then(response =>{
                this.setState({ingredients: response.data});
            })
            // You Have To Set the Catch method to handle errors because if you don't add it
            // the .Then method Still Excutes anyway.
            .catch(error => {
                this.setState({pageError: true});
            });
    }

    checkPurshasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map( igKey =>  ingredients[igKey])
            .reduce( (arr , el )  => arr + el , 0);
        this.setState({purshasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purshasing: true});
    }
    purchaseRequest = () => {
        
        const queryParams = [] ;
        // We Loop through Our Ingrdients
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        // We Convert Our Array To string with [&] betwwen each element ( ingredient ).
        const queryString = queryParams.join('&');
        // So We Pushed Our ingredients through Earvh Params
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString,
        });
    
    }
    purchaseCancelHandler = () => {
        this.setState({purshasing: false});
    }

    addIngredentHandler = (type) => {
        const oldCount = this.state.ingredients[type] ;
        const newCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition ;
        this.setState({ingredients: updatedIngredients , totalPrice: newPrice});
        this.checkPurshasable(updatedIngredients);
    };
    removeIngredentHandler = (type) => {
        const oldCount = this.state.ingredients[type] ;
        if ( oldCount <= 0 ) {
            return
        }
        const newCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = newCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction ;
        this.setState({ingredients: updatedIngredients , totalPrice: newPrice});
        this.checkPurshasable(updatedIngredients);
    };

    render ( ) {
        const disabledIngredients = {...this.state.ingredients};
        // For.. in To Iterate Over Key Of Iterable
        for (let key in disabledIngredients ){
            disabledIngredients[key] = disabledIngredients[key] === 0;
        }

        // Set the Order Summary To Null As it Depends On The Ingredients which isn't fetched yet.
        let orderSummary = null;

        // Set The Burger Intially To <Spinner>Until the ingredients are loaded. 
        // And if The Request Fails We Display A Backup UI.
        let burger = this.state.pageError ? <p>ingredients can't be loaded</p> : <Spinner/>
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls ingredients={this.state.ingredients}
                        ingredientAdded = { this.addIngredentHandler}
                        ingredientRemoved = { this.removeIngredentHandler}
                        disabledInfo = {disabledIngredients} 
                        price= {this.state.totalPrice} 
                        purshasable= {this.state.purshasable}
                        summaryShow = {this.purchaseHandler}/>
                </Aux>
            )
            orderSummary = <OrderSummary ingredients ={this.state.ingredients} 
            show={this.state.purshasing}
            price= {this.state.totalPrice}
            cancel = {this.purchaseCancelHandler}
            submit= {this.purchaseRequest} />
        }
        // Setting The Summary To <Spinner> while Sending Request.
        
        if (this.state.loading) {
            orderSummary =  <Spinner />
        }
        
        return (
            <Aux>
                <Modal show={this.state.purshasing} hide={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    };
};

export default withErrorHandler( BurgerBuilder, axios );