import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';

export default class App extends React.Component {
  componentDidMount() {
  	this.logoutComputation = Tracker.autorun(()=>{
	    if(Meteor.loggingIn()) return;
	    let userId = Meteor.userId();

      if(!FlowRouter.current().route.group) return; //it is a public route

      let groupName = FlowRouter.current().route.group.name;

      switch(groupName){
        case 'admin':
          break;

        case 'loggedIn':
          if(!userId){
            FlowRouter.go('SignIn');
          }
          break;
      }
	  });
  }

  componentWillUnmount(){
  	this.logoutComputation.stop();
  }

  render() {
	  return (

        
        <div className="container-fluid">
          <div className="row main-content">
              <div className="col-sm-12"> 
                <div className="row">
                  { this.props.main }
                </div>
              </div>
          </div>	
        </div>

		);
	}
}

App.propTypes = {
  main: PropTypes.node,
};

