//----
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {_} from 'lodash';
// import AR from 'com.wikitude.phonegap.WikitudePlugin';
//----
import Logger from '/imports/modules/logger';
import WorldInit from '/imports/modules/world';
//----
// const AR = window.WikitudePlugin;
import OnsenUI from 'onsenui';
import Ons from 'react-onsenui'; 


class Home extends Component {
  constructor(props) {
    super(props);
  
    this.state = {

    };
  }
  
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>Onsen UI</div>
      </Ons.Toolbar>
    );
  }

  componentDidMount() {
    console.log('initializing at Home.js')
  }

  render(){
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
        <p>This is Onsen UI!</p>
      </Ons.Page>
    );
  }
}

Home.propTypes = {
  // loading: PropTypes.bool,
};

export default HomeContainer = createContainer(({ itemId }) => {
  // const handle = Meteor.subscribe('users.byId', userId);
  // const loading = !handle.ready();
  // const user = Meteor.users.findOne(userId);

  return {
    // loading,
    // user,
  };
}, Home);
