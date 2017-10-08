import React from "react";
import { FlowRouter } from "meteor/kadira:flow-router";
// import { Meteor } from 'meteor/meteor';
import { mount } from "react-mounter";

// Import needed templates (layout and pages)
import App from "/imports/ui/layouts/App";
import SignIn from "/imports/ui/pages/SignIn";

let loggedInTrigger = ()=>{
  if ((Meteor.loggingIn() || Meteor.userId())) {
    FlowRouter.go("Home");
  }
};

FlowRouter.route("/", {
  name: 'Home',
  action() {
    FlowRouter.go('OrdersList')
  },
});

FlowRouter.route("/sign-in", {
  name: "SignIn",
  action() {
    mount(App, {
      main: <SignIn />
    });
  },
  triggersEnter: [loggedInTrigger]
});