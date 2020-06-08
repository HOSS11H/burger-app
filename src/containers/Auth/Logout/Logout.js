import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from '../../../store/actions/index';

class Logout extends React.Component {

    componentDidMount( ) {
        this.props.logoutHandler( );
    }

    render( ) {
        return (
            <Redirect to='/' />
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logoutHandler : ( ) => dispatch( userLogout( ) ),
    }
}

export default connect(null, mapDispatchToProps )(Logout)