import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {_} from 'lodash';
import {createContainer} from 'meteor/react-meteor-data';

import {FlowRouter} from 'meteor/kadira:flow-router';
import OrdersList from './OrdersList';
import Orders from '/imports/api/orders/orders';
import {ReactiveVar} from 'meteor/reactive-var';


class OrdersListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedItems: [],
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(newProps) {
  }

  componentWillUnmount() {
  }

  changeQuery(newQuery) {
    query.set(newQuery);
  }

  changeLimit() {
    let limit = limit.get();
    limit.set(limit.get() + 10);
  }

  createQuery(filters) {
    let query = {};

    if (filters.length > 0) {
      query.status = {$in: filters};
      return query;
    } else {
      return {status: 'in-review'};
    }
  };

  handleItemClick(event) {
    event.preventDefault();
    const {checkedItems} = this.state;
    let $target = $(event.currentTarget),
      val = $target.attr('data-value'),
      $inp = $target.find('input'),
      idx;

    if (( idx = checkedItems.indexOf(val) ) > -1) {
      checkedItems.splice(idx, 1);
      this.setState({checkedItems});
      setTimeout(function () {
        $inp.prop('checked', false)
      }, 0);
    } else {
      checkedItems.push(val);
      this.setState({checkedItems});
      setTimeout(function () {
        $inp.prop('checked', true)
      }, 0);
    }
    this.changeQuery(this.createQuery(checkedItems));
  };

  render() {
    const {orders} = this.props;

    return (
      <div className="row">
        <div className="col-sm-12">
            <div className="col-sm-2">
              <ul>
                <div>
                  <li><a onClick={this.handleItemClick.bind(this)} href="#" className="small" data-value="in-review"
                         tabIndex="-1"><input type="checkbox"/>&nbsp;In-review</a></li>
                  <li><a onClick={this.handleItemClick.bind(this)} href="#" className="small" data-value="approved"
                         tabIndex="-1"><input type="checkbox"/>&nbsp;Approved</a></li>
                  <li><a onClick={this.handleItemClick.bind(this)} href="#" className="small" data-value="deliced"
                         tabIndex="-1"><input type="checkbox"/>&nbsp;Deliced</a></li>
                </div>
              </ul>
            </div>
          <OrdersList
            changeQuery={this.changeQuery.bind(this)}
            changeLimit={this.changeLimit.bind(this)}
            orders={orders}
          />
        </div>
      </div>
    );
  };
}

let query = new ReactiveVar({status: 'in-review'});
let limit = new ReactiveVar(10);

export default createContainer(params => {
  let newQuery = query.get();
  let newLimit = limit.get();
  const subscriptions = [];
  subscriptions.push(Meteor.subscribe('orders.list', newQuery, {sort: {orderedAt: -1}, limit: newLimit}));
  return {
    orders: Orders.find(newQuery, {sort: {orderedAt: -1}, limit: newLimit}).fetch(),
    loading: !subscriptions.reduce((prev, subscriber) => prev && subscriber.ready(), true),
  };
}, OrdersListContainer);
