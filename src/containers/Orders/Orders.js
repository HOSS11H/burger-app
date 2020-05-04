import React from 'react';
import Classes from './Orders.module.css';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
    state = {
        orders: null,
        loading: true,
    }
    componentDidMount () {
        axios.get('/orders.json')
        .then(response =>{
            let fetchedOrders = [] ;
                for (let key in response.data) {
                    fetchedOrders.push( {
                        ...response.data[key],
                        id: key
                    } )
                }
                this.setState({loading: false, orders: fetchedOrders});
            })
            // You Have To Set the Catch method to handle errors because if you don't add it
            // the .Then method Still Excutes anyway.
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {
        let receivedOrders = null;
        if (this.state.loading) {
            receivedOrders = <Spinner />
        }
        if (this.state.orders) {
            receivedOrders = this.state.orders.map((order , index) => {
                return <Order key={order.id} price={+order.price} ingredients={order.ingredients} />
            })
        }
        return (
            <div className={Classes.Orders}>
                {receivedOrders}
            </div>
        )
    }
}
export default WithErrorHandler(Orders, axios);