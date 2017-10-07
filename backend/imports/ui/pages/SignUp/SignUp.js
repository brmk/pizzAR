import React from 'react';
import { PropTypes } from 'prop-types';
import {FlowRouter} from "meteor/kadira:flow-router"

const SignUp = props => {
  const {handleSignUp} = props;

  return(
    <div className="sign-up container">
    	<div className="col-md-6 col-md-offset-3">    
        <h3 className="text-center">Sign up</h3>
        <form 
          id="sign-up-form"
          onSubmit={handleSignUp}
        >
          <div className="form-group">
            <input
              name="firstName"
              className="form-control"
              type="text"
              placeholder="First Name"
              required="true" 
            />
          </div>
          <div className="form-group">
            <input
              name="lastName"
              className="form-control"
              type="text"
              placeholder="Last Name"
              required="true" 
            />
          </div>
          <div className="form-group">
            <input
              name="email"
              className="form-control"
              type="email"
              placeholder="Email Address"
              required="true"
            />
          </div>
          <div className="form-group">
            <input
              name="password" 
              className="form-control" 
              type="password" 
              placeholder="Password" 
              required="true" 
            />
          </div>
          <div className="form-group">
            <input
              name="confirmPassword" 
              className="form-control" 
              type="password" 
              placeholder="Confirm password" 
              required="true" 
            />
          </div>
          <div className="text-left">
            <button type="submit" className="btn">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp;
