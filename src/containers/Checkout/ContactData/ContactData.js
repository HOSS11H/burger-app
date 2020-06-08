import React from 'react';
import { connect } from 'react-redux';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {  purchaseBurger } from '../../../store/actions/index';

class ContactData extends React.Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                },
                valid: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                },
                valid: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                    isNumeric: true,
                },
                valid: false,
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                },
                valid: false,
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                validation: { },
                valid: true,
                value: '',
            }
        },
        formIsValid: false,
    }
    checkValidity(value , rules) {
        let isValid = true ;
        // If Input Has No validation
        if(!rules) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid ;
        }
        if ( rules.minLength ) {
            isValid  = value.length >= rules.minLength && isValid;
        }
        if ( rules.maxLength ) {
            isValid  = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    orderSubmitHandler = (event) => {
        event.preventDefault();
        let orders = {};
        for (let element in this.state.orderForm) {
            orders[element] = this.state.orderForm[element].value;
        }

        let order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderInfo: orders,
        }
        this.props.onSubmitOrders( order , this.props.token );
    }

    eventChangedHandler = ( event, elementIdentifier ) => {
        let updatedForm = {
            ...this.state.orderForm
        }
        // We Create A Nested Clone As Spread Operator Doesn't make a Deep Clone.
        let updatedElement = {
            ...updatedForm[elementIdentifier]
        }
        updatedElement.value = event.target.value;
        updatedElement.valid = this.checkValidity(updatedElement.value , updatedElement.validation);
        updatedElement.touched = true;

        updatedForm[elementIdentifier] = updatedElement;
        // Overall Form Validation
        let formIsValid = true;
        for (let  inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        //console.log(formIsValid);
        //console.log(updatedElement)
        this.setState({orderForm: updatedForm , formIsValid: formIsValid});
    }

    render () {
        let inputsArray = [];
        for (let el in this.state.orderForm) {
            inputsArray.push({
                id: el,
                config: this.state.orderForm[el]
            })
            //console.log(inputsArray)
        }

        let inputs = inputsArray.map( (el) => {
            return <Input key={el.id} 
            label={el.id} elementType={el.config.elementType} 
            elementConfig={el.config.elementConfig} 
            shouldValidate = {el.config.validation}
            inValid = {!el.config.valid}
            touched={el.config.touched}
            value={el.config.value} changed={ (event) => this.eventChangedHandler(event, el.id)}/>
        } );

        let form = (
            <form onSubmit= {this.orderSubmitHandler}>
                {inputs}
                <Button type='Success' disabled={!this.state.formIsValid} >Order</Button>
            </form>
        )
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return {
        ingredients: state.ing.ingredients,
        totalPrice: state.ing.totalPrice,
        loading: state.ord.ordersLoading,
        purchased: state.ord.purchased,
        token: state.auth.idToken
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onSubmitOrders: ( order, token ) => dispatch( purchaseBurger( order , token ) )
    }
}

// You Can Use The withRouter Component To Get the history-match props Instead of doing it manually.
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));