import Orders from './orders';
import {ValidatedMethod} from 'meteor/mdg:validated-method';


export const addOrder = new ValidatedMethod({
  name: 'orders.insert',
  validate: null,
  run(order) {
    order.orderedAt = new Date();
    order.status = 'in-review';

    let orderId = Orders.insert(order);
    console.log(
      `[orders.insert] Created order ${orderId}. args: ${JSON.stringify(arguments)}`);
    return orderId;
  }
});

export const updateOrder = new ValidatedMethod({
  name: 'orders.update',
  validate: null,
  run(order) {
    let orderId = order.orderId;
    order = _.omit(order, 'orderId');
    Orders.update({_id: orderId}, {$set: order});

    console.log(
      `[orders.update] Updated order ${orderId}. args: ${JSON.stringify(
        arguments
      )}`
    );
  }
});