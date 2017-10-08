import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {_} from 'lodash';
import {createContainer} from 'meteor/react-meteor-data';
import {FlowRouter} from 'meteor/kadira:flow-router';
import moment from 'moment';

export default class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  componentWillReceiveProps(newProps) {

  }

  componentWillUnmount() {
  }

  approveOrder() {
    let orderId = this._id;
    Meteor.call('orders.update', {orderId, status: 'approved'}, (err, res) => {
      if (err) {
        console.log(err.message);
      }
    });
  }

  deliceOrder() {
    let orderId = this._id;
    Meteor.call('orders.update', {orderId, status: 'deliced'}, (err, res) => {
      if (err) {
        console.log(err);
      }
    });
  }
  replaceAll(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
  }

  formatDate(orderedAt) {
    return moment(orderedAt).format('DD/MM/YYYY, HH:mm')
  }
  getOrderPizzas (order) {
    let pizzaNames = order.pizzas.map((pizza) => {
      return pizza.name;
    });

    return this.replaceAll(pizzaNames.join(), ',', ', ');
  }
  render() {
    const {orders} = this.props;
    return (
      <div className="col-sm-10">
        <ul className="col-sm-12">
          {orders.map((order, index) => {
            return (
              <li key={order._id} className="order-list-item">
                <div className="col-sm-12 item-wrapper">
                  <ul className="col-sm-9 order-item">
                    <li>
                      <a href={FlowRouter.path('OrderInfo', {orderId: order._id})}>
                        Order: #{order._id}
                      </a>
                    </li>
                    <li>
                      Pizzas: {this.getOrderPizzas(order)}
                    </li>
                    <li>
                      Price: {order.orderPrice}
                    </li>
                    <li>
                      Phone: {order.ordererPhone}
                    </li>
                    <li>
                      Address: {order.ordererAddress}
                    </li>
                    <li>
                      Ordered at: {this.formatDate(order.orderedAt)}
                    </li>
                  </ul>
                    {
                      order.status === 'approved' ? 'Approved' : order.status === 'deliced' ? 'Deliced' :
                        <div>
                          <button type="button" className="btn btn-primary button-approve" onClick={this.approveOrder.bind(order)}>Approve</button>
                          <button type="button" className="btn btn-danger button-delice" onClick={this.deliceOrder.bind(order)}>Delice</button>
                        </div>
                    }

                </div>
              </li>
            )
          })}
        </ul>
      </div>
    );
  };
}
