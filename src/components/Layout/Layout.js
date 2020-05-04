import React from "react";
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
                <Toolbar sideDrawerToggle={this.sideDrawertoggleHandler} />
                <SideDrawer opened={this.state.sideDrawer} event={this.sideDrawerCancelHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

export default Layout;