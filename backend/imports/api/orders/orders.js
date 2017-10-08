import { Mongo } from 'meteor/mongo';

const Orders = new Mongo.Collection('orders');

export default Orders;


Orders.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Orders.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});