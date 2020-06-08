import React from "react";
import { connect } from 'react-redux';
import classes from "./Layout.module.css";
import Aux from "../../hoc/Auxilliary";
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
    
    state= {
        sideDrawer:false,
    }

    sideDrawertoggleHandler = ( ) => {
        this.setState( (prevState) => {
            return {sideDrawer: !prevState.sideDrawer}
        });
    }
    sideDrawerCancelHandler = ( ) => {
        this.setState({sideDrawer: false});
    }

    render ( ) {    
        return (
            <Aux>
                <Toolbar sideDrawerToggle={this.sideDrawertoggleHandler} 
                    authentication={this.props.isAuth} />
                <SideDrawer opened={this.state.sideDrawer} 
                    event={this.sideDrawerCancelHandler} 
                    authentication={this.props.isAuth} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};
const mapStateToProps = state => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default connect( mapStateToProps , null )(Layout);