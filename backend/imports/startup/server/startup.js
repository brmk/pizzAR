import Orders from '../../../imports/api/orders/orders';
import {Meteor} from 'meteor/meteor';

const ADMIN_EMAIL = 'admin@admin.com', ADMIN_PASSWORD = 'admin';

Meteor.startup(() => {
  if (Orders.find().count() === 0) {
    let orders = Assets.getText('dummy-orders.json');
    orders = JSON.parse(orders);
    orders.forEach((order) => {
      order.orderedAt = new Date();
      order.status = 'in-review';
      Orders.insert(order);
    });
  }

  if (!Meteor.users.findOne({'emails.address': ADMIN_EMAIL})) {
    Accounts.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      profile: {
        firstName: 'Default',
        lastName: 'Admin',
      }
    });
  }
});