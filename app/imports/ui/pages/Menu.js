//----
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {_} from 'lodash';
// import AR from 'com.wikitude.phonegap.WikitudePlugin';
//----
// import Logger from '/imports/modules/logger';
// import WorldInit from '/imports/modules/world';
//----
// const AR = window.WikitudePlugin;
import OnsenUI from 'onsenui';
import Ons from 'react-onsenui';

let pizzas = {
  capricciosa:{
    name: "Capricciosa",
    price: 60,
    ingridients:["sause", "cheese", "ham", "mushrooms"],
    weigtht: 500
  },
  margarita:{
    name: "Margarita",
    price: 30,
    ingridients:["sause", "cheese"],
    weigtht: 450
  },
  hawaian:{
    name: "Hawaian",
    price: 65,
    ingridients: ["sause", "ham", "pineapple", "cheese"],
    weigtht: 550
  }
}


class Menu extends Component {
  constructor(props) {
    super(props);
  
    this.state = {

    };
  }
  
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
          <Ons.BackButton onClick={()=>{history.back()}}>Back</Ons.BackButton>
        </div>
        <div className='center'>Menu</div>
      </Ons.Toolbar>
    );
  }

  componentDidMount() {
    console.log('initializing at Menu.js')
  }

  render(){
    return (
      <Ons.Page renderToolbar={this.renderToolbar}>
        {_.map(pizzas, (pizza, key)=>{
          return (<Ons.Col width="50%">
            <Ons.Card verticalAlign>
              <img className="img-responsive" src="http://www.seriouseats.com/images/2017/04/20170411-pizza-oven-testing-roccbox-top.jpg"/>
              <Ons.Col width="80%">
                <div>
                  <h3>{pizza.name}</h3>
                  <h4>{pizza.price} UAH</h4>
                </div>
              </Ons.Col>
              <Ons.Col width="20%">
                <Ons.Icon icon='fa-shopping-cart' />
              </Ons.Col>
              
            </Ons.Card>
          </Ons.Col>)
          
        })}

      </Ons.Page>
    );
  }
}

export default MenuContainer = createContainer(({ itemId }) => {
  // const handle = Meteor.subscribe('users.byId', userId);
  // const loading = !handle.ready();
  // const user = Meteor.users.findOne(userId);

  return {
    // loading,
    // user,
  };
}, Menu);
