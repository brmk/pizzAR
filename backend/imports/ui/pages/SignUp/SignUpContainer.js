import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Meteor} from "meteor/meteor";
import {_} from 'lodash';
import {createContainer} from 'meteor/react-meteor-data';

import {FlowRouter} from "meteor/kadira:flow-router";
import SignUp from "./SignUp";



class SignUpContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  handleSignUp(event){
    event.preventDefault();
    let form = event.currentTarget;
    const { firstName, lastName, email, password, confirmPassword } = form;
    if(password.value != confirmPassword.value){
      //Toast here
      console.log("Password don't match!");
      return
    }
    let user = {
      profile:{
        firstName: firstName.value,
        lastName: lastName.value
      },
      email: email.value,
      password: password.value,
    }
    
    Meteor.call('users.insert', {user}, (err, res)=>{
      if (err){
        //Toast here
        console.log(err.reason)
      } else {
        if(email.value && password.value){
          Meteor.loginWithPassword(email.value, password.value);
        }
        //Toast here
        console.log('Welcome to Bringface!')
        FlowRouter.go("Dashboard")
      }
    })
  }

  render() {

    return (
      <SignUp
        handleSignUp={this.handleSignUp.bind(this)}
      />
    );
  };
};


export default createContainer(params => {
  return {};
}, SignUpContainer);
