import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Meteor} from "meteor/meteor";
import {_} from 'lodash';
import {createContainer} from 'meteor/react-meteor-data';
import $ from "jquery"
import 'jquery-validation';

import {FlowRouter} from "meteor/kadira:flow-router";
import SignIn from "./SignIn";



class SignInContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    let self = this;
    $("#login-form").validate({
      rules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Email is required',
          email: 'Email is not valid',
        },
        password: {
          required: 'Password is required',
        },
      },
      submitHandler() {
        self._login($("#login-form")[0])
      },
    });
  }

  componentDidUpdate() {
  }

  _login(form){

    const email = form.email.value;
    const password = form.password.value;

    Meteor.loginWithPassword(email, password, (error) => {
      if (error) {
        console.log(error.reason);
      } else {
        FlowRouter.go('Home');
      }
    });
  }

  handleLogin(form){
    $(form).validate();
  }

  render() {

    return (
      <SignIn
        handleLogin={this.handleLogin.bind(this)}
      />
    );
  };
};


export default createContainer(params => {
  return {};
}, SignInContainer);
