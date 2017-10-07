import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Logger } from '/imports/modules/logger.js';

export default class App extends React.Component {

  componentWillReceiveProps(){
    
  }
  componentDidMount() {
  	this.logoutComputation = Tracker.autorun(()=>{ 
  		// Logger.log('Logout computation');
	   //  if(Meteor.loggingIn() || !Roles.subscription.ready()) return;
	   //  let userId = Meteor.userId();
	   //  if(!userId || !Roles.userIsInRole(userId, 'admin')){
	   //  	Logger.log('User is not admin or not logged in! Logging out')
	   //  	Meteor.logout();
	   //  	FlowRouter.go('SignIn');
	   //  }
	   
	  });
  }

  componentWillUnmount(){
  	this.logoutComputation.stop();
  }


  render() {

	  return (
	  	<div className="App">
	    	<main>
          <section className="main-content">
  		      { this.props.main }
          </section>
	      </main>
		  </div>
		);
	}
}

App.propTypes = {
  main: PropTypes.node,
};

