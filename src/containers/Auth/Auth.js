import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { auth, authRedirect } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import {  updateObject , checkValidity } from '../../shared/utility';


class Auth extends React.Component {
    state = {
        AuthForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                },
                valid: false,
            }
        },
        formIsValid: false,
        isSignUp: true,
    }
    
    eventChangedHandler = ( event , id ) => {
        let updatedElement = updateObject(this.state.AuthForm[id] , {
            value : event.target.value,
            touched : true,
            valid : checkValidity( event.target.value, this.state.AuthForm[id].validation ) ,
        }) ;


        let updatedForm =updateObject(this.state.AuthForm , {
            [id] : updatedElement,
        });
        // Overall Form Validation
        let formIsValid = true;
        for (let  inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }

        this.setState( { AuthForm: updatedForm , formIsValid: formIsValid } )
    }
    
    formSubmitHandler = ( event ) => {
        event.preventDefault( );
        this.props.submitFormHandler( this.state.AuthForm.email.value, this.state.AuthForm.password.value , this.state.isSignUp);
    }

    switchFormHandler = ( event ) => {
        event.preventDefault( );
        this.setState( prevState => {
            return {
                isSignUp: !prevState.isSignUp,
            }
        } )
    } 
    
    componentDidMount( ) {
        if ( !this.props.burgerIsBuilt ) {
            this.props.authRedirectHandler( );
        }
    }

    render ( ) {
        let formElements = [ ] ;
        for (let el in this.state.AuthForm ) {
            let element = {
                id: el,
                config: this.state.AuthForm[el]
            }
            formElements.push(element);
        };

        let inputs = formElements.map( el => {
            return <Input key={el.id} 
            label={el.id} elementType={el.config.elementType} 
            elementConfig={el.config.elementConfig} 
            shouldValidate = {el.config.validation}
            inValid = {!el.config.valid}
            touched={el.config.touched}
            value={el.config.value} changed={ (event) => this.eventChangedHandler(event, el.id)}/>
        } );
        let form = ( 
                        <form onSubmit={this.formSubmitHandler}>
                            {inputs}
                            <Button type='Success'
                                disabled={!this.state.formIsValid}>
                                { this.state.isSignUp ? 'Sign Up' : 'Sign In' }
                            </Button>
                            <div>
                                <Button type='Danger' clicked={this.switchFormHandler} >
                                    Switch to { this.state.isSignUp ? 'Sign In' : 'Sign Up' }
                                </Button>
                            </div>
                        </form>
            );
        if ( this.props.loading ) {
            form = <Spinner />
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p style= { {
                color: 'red' ,
                textTransform: 'capitalize',
                } } >
                    { this.props.error.split('_').join(' ') }
            </p>
        }

        return (
            <div className={classes.Auth}  >
                <h2>{ this.state.isSignUp ? 'Sign Up' : 'Sign In' }</h2>
                {this.props.isAuth  ? <Redirect to={ this.props.authRedirect } / > : null}
                {errorMessage}
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { 
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.isAuth,
        burgerIsBuilt: state.ing.building,
        authRedirect: state.auth.authRedirectLink,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        submitFormHandler : ( email, password, type ) => dispatch( auth( email, password, type ) ) ,
        authRedirectHandler: ( ) => dispatch( authRedirect( '/' ) )
    }
}


export default connect( mapStateToProps, mapDispatchToProps )(Auth );