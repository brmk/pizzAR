import React from "react";
import { FlowRouter } from "meteor/kadira:flow-router";
import { Meteor } from 'meteor/meteor';
import { mount } from "react-mounter";

// Import needed templates (layout and pages)
import App from "/imports/ui/layouts/App";
import Dashboard from "/imports/ui/pages/Dashboard";
import Room from "/imports/ui/pages/Room"

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

loggedIn.route('/dashboard',{
  name: 'Dashboard',
  action(params, queryParams) {
    mount(App, {
      main: (
        <Dashboard/>
      ),
    });
  },
});

loggedIn.route('/room/:roomId',{
  name: 'Room',
  action(params, queryParams) {
    mount(App, {
      main: (
        <Room
          roomId={params.roomId}
        />
      ),
    });
  },
});