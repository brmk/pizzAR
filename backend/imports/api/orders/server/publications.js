import Orders from '../orders';
import { Meteor } from 'meteor/meteor';

Meteor.publish('orders.list', function (query={}, params={}) {
  return Orders.find(query, params);
});

Meteor.publish('order.byId', function (orderId) {
  return Orders.find({_id: orderId});
});
