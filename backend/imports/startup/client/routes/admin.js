import React from "react";

import { FlowRouter } from "meteor/kadira:flow-router";
import { Meteor } from 'meteor/meteor';
import { mount } from "react-mounter";

// Import needed templates (layout and pages)
import App from "/imports/ui/layouts/App";

const admin = FlowRouter.group({
  name: "admin",
  prefix: "/admin",
  triggersEnter: [
    function() {
      if (!(Meteor.loggingIn() || Meteor.userId())) {
        FlowRouter.go("SignIn");
      }
    }
  ]
});

export default admin;
