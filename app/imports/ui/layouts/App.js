import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Logger } from '/imports/modules/logger.js';

import OnsenUI from 'onsenui';
import Ons from 'react-onsenui';

import Home from '../pages/Home';
import Menu from '../pages/Menu';

export default class App extends React.Component {

  componentWillReceiveProps(){
    
  }

  renderToolbar(route, navigator) {
    const backButton = route.hasBackButton
      ? <Ons.BackButton onClick={this.back.bind(this, navigator)}>Back</Ons.BackButton>
      : null;

    return (
      <Ons.Toolbar>
        <div className='left'>{backButton}</div>
        <div className='center'>{route.title}</div>
      </Ons.Toolbar>
    );
  }

  back(){
    navigator.popPage();
  }

  pushPage(page,navigator) {
    navigator.pushPage(page);
  }

  renderPage(route, navigator) {
    console.log(route)
    const routes = {
      Home,
      Menu
    }

    const component = routes[route.key];

    console.log(component)
    return component
    return (
      <component 
        key={Math.random}
        pushPage={this.pushPage.bind(this)}
        back={this.back.bind(this)}
        navigator={navigator}
      />
    );
  }

  // render() {
  //   return (
  //     <Ons.Navigator
  //       swipeable
  //       renderPage={this.renderPage.bind(this)}
  //       initialRoute={{
  //         key: 'Home',
  //         hasBackButton: false
  //       }}
  //     />
  //   );
  // }


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

