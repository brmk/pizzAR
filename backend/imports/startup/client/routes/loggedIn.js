import React from "react";
import { FlowRouter } from "meteor/kadira:flow-router";
import { Meteor } from 'meteor/meteor';
import { mount } from "react-mounter";

// Import needed templates (layout and pages)
import App from "/imports/ui/layouts/App";
import Order from "../../../ui/components/Order/Order";
import OrdersListContainer from "../../../ui/components/OrdersListContainer/OrdersListContainer";

const loggedIn = FlowRouter.group({
  name: "loggedIn",
  triggersEnter: [
    function() {
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        FlowRouter.go("SignIn");
      }
    }
  ]
});

loggedIn.route('/ordersList',{
  name: 'OrdersList',
  action(params, queryParams) {
    mount(App, {
      main: (
        <OrdersListContainer/>
      ),
    });
  },
});

loggedIn.route('/order/:orderId',{
  name: 'OrderInfo',
  action(params, queryParams) {
    mount(App, {
      main: (
        <Order
          orderId={params.orderId}
        />
      ),
    });
  },
});