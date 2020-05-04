import React from 'react';
import Aux from '../Auxilliary';
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = ( WrappedComponent , axios ) => {
    return class extends React.Component {

        state = {
            error: null,
            errorMessage: null,
        }
        // We Call The Interceptors In The Constructor Instead of ComponentDidUpdate
        // Because constructor( ) runs Before the Render Method and that helps
        // To catch errors in the render method 
        // But Making it in the ComponentDid Update Won't trigger The Modal. as it excutes after 
        // the render method 
        constructor (props)  {
            super(props);
            this.reqInterceptor = axios.interceptors.request.use(req => {
                    this.setState({error: null});
                    return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res =>res , (error) => {
                return this.setState({error: true , errorMessage: error.message });
            })
        }
        
        componentWillUnmount = () => {
            // We Clear The Interceptors after removing the component 
            // To avoid making multiple interceptors for the same axios instance.
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Aux>
                    <Modal show={this.state.error} hide={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.errorMessage : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;
