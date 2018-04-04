import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {createContainer} from 'meteor/react-meteor-data';
import Orders from '/imports/api/orders/orders';
import moment from 'moment';
import {Meteor} from 'meteor/meteor';

class Order extends Component {
  constructor(props) {
    super(props);
  }

  formatDate(orderedAt) {
    return moment(orderedAt).format('DD/MM/YYYY, HH:mm')
  }

  replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
  }

  getPizzaIngredients(pizza) {
    let pizzaIngridients = pizza.ingridients.map((ingridient) => {
      return ingridient;
    });

    return this.replaceAll(pizzaIngridients.join(), ',', ', ');
  }

  getNormalSize(size) {
    return size === 0.7 ? 'S' : size === 1 ? 'M' : size === 1.5 ? 'L' : null;
  }

  approveOrder() {
    let orderId = this._id;
    Meteor.call('orders.update', {orderId, status: 'approved'}, (err, res) => {
      if (err) {
        console.log(err.message);
      }
      else {
        FlowRouter.go('Home');
      }
    });
  }

  deliceOrder() {
    let orderId = this._id;
    Meteor.call('orders.update', {orderId, status: 'deliced'}, (err, res) => {
      if (err) {
        console.log(err);
      }
      else {
        FlowRouter.go('Home');
      }
    });
  }

  render() {
    const {order} = this.props;
    return (
      <div>
        {order ?
          <div>
            <ul className="order-item">
              <li>Order: {order._id}</li>
              <li>Price: {order.orderPrice}</li>
              <li>Phone: {order.ordererPhone}</li>
              <li> Address: {order.ordererAddress}</li>
              <li> Ordered at: {this.formatDate(order.orderedAt)}</li>
            </ul>
            <ul className="order-pizzas">
              {order.pizzas.map((pizza, index) => {
                return (
                  <li key={pizza._id} className="order-list-item">
                    <div className="col-sm-12 item-wrapper">
                      <ul className="col-sm-9 order-item">
                        <li>
                          <img src={pizza.img} className="pizza-image-order"/>
                        </li>
                        <li className="center-text">
                          {pizza.name}
                        </li>
                        <li className="center-text">
                          Price: {pizza.price}
                        </li>
                        <li className="center-text">
                          Weight: {pizza.weight}
                        </li>
                        <li className="center-text">
                          Size: {this.getNormalSize(pizza.size)}
                        </li>
                        {pizza.ingridients ?
                          <li className="center-text">
                            {this.getPizzaIngredients(pizza)}
                          </li>
                          : null
                        }
                      </ul>
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="pizzas-status">
            {
              order.status === 'approved' ? <div>Approved</div> : order.status === 'deliced' ? <div>Declined</div> :
                <div>
                  <button type="button" className="btn btn-primary button-approve" onClick={this.approveOrder.bind(order)}>Approve</button>
                  <button type="button" className="btn btn-danger button-delice" onClick={this.deliceOrder.bind(order)}>Delice</button>
                </div>
            }
            </div>
          </div>
          : ''}
      </div>
    );
  }
}

export default createContainer(params => {
  const subscriptions = [];
  let orderId = params.orderId;
  subscriptions.push(Meteor.subscribe('order.byId', orderId));

  return {
    order: Orders.findOne({_id: orderId}),
    loading: !subscriptions.reduce((prev, subscriber) => prev && subscriber.ready(), true),
  };
}, Order);














