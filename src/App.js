import React , { Suspense } from 'react';
import { connect } from 'react-redux';
import classes from  './App.module.css';
import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout';
import { Route , Switch , withRouter , Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { checkAuth } from './store/actions/index';


const Orders = React.lazy( ( ) => import('./containers/Orders/Orders') )

class App extends React.Component {

  componentDidMount( ) {
    this.props.authCheck( );
  }

  
  render ( ) {
    let routes = (
      // Routes For Unauth users
      <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/' component={BurgerBuilder} />
          <Redirect to='/' />
      </Switch>
    )
    if (this.props.authenticated) {
      routes = (
        // Routes For Auth users
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' render={ ( ) => <Suspense fallback> <Orders /> </Suspense> } />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <div className={classes.App}>
        <Layout>
          { routes }
        </Layout>
      </div>
    );

  }
}
const mapStateToProps = state => {
  return {
    authenticated: state.auth.isAuth,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    authCheck: ( ) => dispatch( checkAuth( ) ),
  }
}

export default withRouter(connect( mapStateToProps , mapDispatchToProps )(App));
