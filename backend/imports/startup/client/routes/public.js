import React from "react";
import { FlowRouter } from "meteor/kadira:flow-router";
// import { Meteor } from 'meteor/meteor';
import { mount } from "react-mounter";

// Import needed templates (layout and pages)
import App from "/imports/ui/layouts/App";
import SignIn from "/imports/ui/pages/SignIn";
import SignUp from "/imports/ui/pages/SignUp";

let loggedInTrigger = ()=>{
  if ((Meteor.loggingIn() || Meteor.userId())) {
    FlowRouter.go("Dashboard");
  }
}

FlowRouter.route("/", {
  name: 'Home',
  action() {
    FlowRouter.go('Dashboard')
  },
})

FlowRouter.route("/sign-in", {
  name: "SignIn",
  action() {
    mount(App, {
      main: <SignIn />
    });
  },
  triggersEnter: [loggedInTrigger]
});

FlowRouter.route("/sign-up", {
  name: "SignUp",
  action(params) {
    mount(App, {
      main: <SignUp
      />
    });
  },
  triggersEnter: [loggedInTrigger]
});