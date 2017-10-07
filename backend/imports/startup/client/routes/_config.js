import React from "react";
import { FlowRouter } from "meteor/kadira:flow-router";
// import { Meteor } from 'meteor/meteor';
import { mount } from "react-mounter";
import App from "/imports/ui/layouts/App";
import NotFound from "/imports/ui/pages/NotFound";

// not found template

FlowRouter.notFound = {
  action() {
    mount(App, {
      main: (<NotFound />)
    });
  }
};
