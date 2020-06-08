import React from 'react';
import Classes from './Orders.module.css';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { fetchOrders , deleteOrders , deleteOrdersConfirm } from '../../store/actions/index';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

class Orders extends React.Component {
    
    state = {
        dismiss: false,
    }

    componentDidMount () {
        this.props.fetchOrders( this.props.token );
    }
    dismissHandler = ( ) => {
        this.setState({dismiss: true});
    }

    render () {
        let receivedOrders = null;
        if (this.props.loading) {
            receivedOrders = <Spinner />
        }
        if (this.props.orders) {
            receivedOrders = this.props.orders.map((order , index) => {
                return <Order key={order.id} 
                    price={+order.price} 
                    ingredients={order.ingredients} 
                    clicked = { ( ) => { this.props.deleteOrders( order.id , this.props.token ) } } />
            })
        }
        return (
            <div className={Classes.Orders}>
                <Modal show={this.props.deleting} >
                    <div>
                        {this.props.deleted ? 'YOUR ORDER WAS DELETED' : 'DELETING'}
                    </div>
                    <Button type='Success' clicked={this.props.deleteConfirm}>Confirm</Button>
                </Modal>
                {receivedOrders}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        orders : state.ord.fetchedOrders, 
        loading : state.ord.ordersLoading,
        deleting: state.ord.deleting,
        deleted: state.ord.deleted,
        token: state.auth.idToken,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: ( token ) => dispatch( fetchOrders( token ) ),
        deleteOrders: ( id , token ) => dispatch( deleteOrders( id , token) ),
        deleteConfirm : ( ) => dispatch ( deleteOrdersConfirm( ) )
    }
}

export default connect( mapStateToProps, mapDispatchToProps )(WithErrorHandler(Orders, axios));