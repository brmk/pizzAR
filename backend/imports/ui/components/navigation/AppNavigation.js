import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {FlowRouter} from 'meteor/kadira:flow-router';


const handleLogout = () => Meteor.logout(() => FlowRouter.go('SignIn'));

const userName = (user = Meteor.user()) => {
  if(!user.profile) return null;
  const {firstName, lastName} = user.profile;
  return firstName && lastName ? `${firstName} ${lastName}` : 'Unknown User';
};

const AppNavigation = ({user}) => (
  <div className="wrapper white-header">
    <div className="container-fluid">  
      <div className="row">
        <div className="col-sm-12">
          <div className="row">
            <nav className="navbar navbar-default none-border-radius">
              <div className="navbar-header">

                <a className="navbar-brand" href={FlowRouter.path('Home')}>
                 PizzAR
                </a>
              </div>
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav navbar-right block-on-mobile">
                  {!!user ?
                    <ul className='nav navbar-nav navbar-right block-on-mobile'>
                      <li onClick={ handleLogout }>
                        <a className="btn-fullheight" href="">
                          Logout
                        </a>
                      </li>
                    </ul>
                    : null
                  }
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
);



AppNavigation.propTypes = {
  user: PropTypes.object,
};

export default AppNavigationContainer = createContainer( () => {
  return { user: Meteor.user() };
}, AppNavigation);
