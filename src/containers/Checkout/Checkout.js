import React
 from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import Spinner from '../../components/UI/Spinner/Spinner';
class Checkout extends React.Component {
    state ={
        ingredients: null,
        totalPrice: 0,
    }
    // So That We Set the Ingredients Before The Render Method
    componentDidMount () {
        // We had an Object Of Params
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = { };
        let price = null;
        // query.entries() is URLSearch Iterator.
        for (let param of query.entries() ) {
            // [ 'salad ', '1' ]
            if(param[0] === 'price') {
                price = +param[1];
            } else {
                ingredients[param[0]] = +param[1]
            }
        }
        this.setState({ingredients: ingredients , totalPrice: price})
    }
    checkoutContinueHandler = ( ) => {
        this.props.history.replace('/checkout/contact-data');
    }
    checkoutCancelHandler = ( ) => {
        //console.log(this.props)
        this.props.history.goBack();
    }
    
    render () {
        let checkoutContent = <Spinner />
        if (this.state.ingredients) {
            checkoutContent = (
                <React.Fragment>
                    <CheckoutSummary ingredients={this.state.ingredients} 
                        cancelHandler={this.checkoutCancelHandler} 
                        continueHandler={this.checkoutContinueHandler} />
                    <Route path={this.props.match.path + '/contact-data'} 
                        render={ (props) => <ContactData ingredients={this.state.ingredients} {...props} price={this.state.totalPrice} /> }
                        />
                </React.Fragment>
            )
        }
        return (
            <div>
                {checkoutContent}
            </div>
        )
    }
}

export default Checkout;