import React from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
        ingredients: this.props.ingredients,
        totalPrice: this.props.price,
        loading: false,
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

        return isValid;
    }

    orderSubmitHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});

        let orders = {};
        for (let element in this.state.orderForm) {
            orders[element] = this.state.orderForm[element].value;
        }

        let order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            orderInfo: orders,
        }
        axios.post('/orders.json' , order)
            .then(response => {
                this.setState({loading: false});
                this.props.history.push('/');
                
            })
            .catch(error => {
                this.setState({loading: false});
            }); 
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
        if (this.state.loading) {
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
// You Can Use The withRouter Component To Get the history-match props Instead of doing it manually.
export default ContactData;