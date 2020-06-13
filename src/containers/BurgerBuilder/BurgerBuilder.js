import React from "react";
import { connect } from 'react-redux';

//import classes from "./BurgerBuilder.module.css"
import Aux  from "../../hoc/Auxilliary";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from "../../components/UI/Spinner/Spinner";
import { addIngredient , removeIngredient , initIngredients , purchaseBurgerInit , authRedirect } from '../../store/actions/index';


export class BurgerBuilder extends React.Component {

    state = {
        purshasing: false,
    };
    
    componentDidMount = () => {
        this.props.initializeIngredientsHandler();
    } 

    checkPurshasable = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map( igKey =>  ingredients[igKey])
            .reduce( (arr , el )  => arr + el , 0);
        return sum > 0 ;
    }

    purchaseHandler = () => {
        if ( this.props.isAuth ) {
            this.setState({purshasing: true});
        }
        this.props.history.push('/auth');
        this.props.setAuthRedirect('/checkout');
    }
    purchaseRequest = () => {
        
        /* const queryParams = [] ;
        // We Loop through Our Ingrdients
        for(let i in this.props.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
        }
        queryParams.push('price=' + this.props.totalPrice);
        // We Convert Our Array To string with [&] betwwen each element ( ingredient ).
        const queryString = queryParams.join('&');
        // So We Pushed Our ingredients through Earvh Params */
        this.props.history.push({
            pathname: '/checkout',
        });
        this.props.intializePurchase( );
    }
    purchaseCancelHandler = () => {
        this.setState({purshasing: false});
    }

    /* addIngredentHandler = (type) => {
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
    }; */

    render ( ) {
        const disabledIngredients = {...this.props.ingredients};
        // For.. in To Iterate Over Key Of Iterable
        for (let key in disabledIngredients ){
            disabledIngredients[key] = disabledIngredients[key] === 0;
        }

        // Set the Order Summary To Null As it Depends On The Ingredients which isn't fetched yet.
        let orderSummary = null;

        // Set The Burger Intially To <Spinner>Until the ingredients are loaded. 
        // And if The Request Fails We Display A Backup UI.
        let burger = this.props.pageError ? <p>ingredients can't be loaded</p> : <Spinner/>
        if(this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls ingredients={this.props.ingredients}
                        ingredientAdded = { this.props.addIngredentHandler}
                        ingredientRemoved = { this.props.removeIngredentHandler}
                        disabledInfo = {disabledIngredients} 
                        price= {this.props.totalPrice} 
                        purshasable= { this.checkPurshasable( this.props.ingredients ) }
                        summaryShow = { this.purchaseHandler } 
                        authentication= { this.props.isAuth } />
                </Aux>
            )
            orderSummary = <OrderSummary ingredients ={this.props.ingredients} 
            show={this.state.purshasing}
            price= {this.props.totalPrice}
            cancel = {this.purchaseCancelHandler}
            submit= {this.purchaseRequest} />
        }
        // Setting The Summary To <Spinner> while Sending Request.
        
        /* if (this.state.loading) {
            orderSummary =  <Spinner />
        } */
        
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

const mapStateToProps = state =>{
    return {
        ingredients: state.ing.ingredients,
        totalPrice: state.ing.totalPrice,
        pageError: state.ing.pageError,
        isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        addIngredentHandler: ( type ) =>  dispatch( addIngredient( type ) ) ,
        removeIngredentHandler: ( type ) =>  dispatch( removeIngredient( type ) ) ,
        initializeIngredientsHandler: ( ) => dispatch( initIngredients() ),
        intializePurchase: ( ) => dispatch( purchaseBurgerInit( ) ) , 
        setAuthRedirect: ( path ) => dispatch( authRedirect( path ) )
    }
}



export default connect(mapStateToProps , mapDispatchToProps )(withErrorHandler( BurgerBuilder, axios ));