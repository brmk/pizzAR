//----
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {_} from 'lodash';
import {FlowRouter} from "meteor/kadira:flow-router"
// import AR from 'com.wikitude.phonegap.WikitudePlugin';
//----
import Logger from '/imports/modules/logger';
//----
// const AR = window.WikitudePlugin;
import OnsenUI from 'onsenui';
import Ons from 'react-onsenui'; 


export default class Home extends Component {
  constructor(props) {
    super(props);
  
    this.state = {

    };
  }
  
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='center'>PizzAR</div>
      </Ons.Toolbar>
    );
  }

  componentDidMount() {
    console.log('initializing at Home.js')
  }

  render(){
    return (

      <div className="Home">
        <Ons.Page>
          <Ons.Card verticalAlign modifier="material">
            <Ons.Row>
              <img className="brand-logo" src="/assets/logo.png"/>
            </Ons.Row>
            <Ons.Row>
              <Ons.Col width="100%">
                <Ons.Button onClick={()=>{FlowRouter.go("Menu")}} style={{margin: '6px'}} modifier='large'>Menu</Ons.Button>
                
              </Ons.Col>
              {/*<Ons.Col width="100%">
                <Ons.Button style={{margin: '6px'}} modifier='large'>Favourites</Ons.Button>
                
              </Ons.Col>
              <Ons.Col width="100%">
                <Ons.Button style={{margin: '6px'}} modifier='large'>My Orders</Ons.Button>
                
              </Ons.Col>
              */}
              <Ons.Col width="100%">
                <Ons.Button style={{margin: '6px'}} modifier='large' onClick={()=>{alert('Ta Da. Made by Spaceship Innovations')}}>About</Ons.Button>
                
              </Ons.Col>
            </Ons.Row>
          </Ons.Card>
          {/*<Ons.Button onClick={()=>{WorldInit.initialize()}}>Hello</Ons.Button>*/}
        </Ons.Page>
      </div>
    );
  }
}

Home.propTypes = {
  // loading: PropTypes.bool,
};


