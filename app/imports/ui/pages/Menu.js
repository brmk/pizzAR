//----
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Meteor }  from 'meteor/meteor';
import {Session} from 'meteor/session'
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
    weight: 500,
    image: "http://www.seriouseats.com/images/2017/04/20170411-pizza-oven-testing-roccbox-top.jpg"
  },
  margarita:{
    name: "Margarita",
    price: 30,
    ingridients:["sause", "cheese"],
    weight: 450,
    image: "http://www.seriouseats.com/images/2017/04/20170411-pizza-oven-testing-roccbox-top.jpg"
  },
  hawaian:{
    name: "Hawaian",
    price: 65,
    ingridients: ["sause", "ham", "pineapple", "cheese"],
    weight: 550,
    image: "http://www.seriouseats.com/images/2017/04/20170411-pizza-oven-testing-roccbox-top.jpg"
  }
}


class Menu extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      sizes:{
        capricciosa: 1,
        margarita: 1,
        hawaian: 1
      }
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
        <Ons.Row>
          {_.map(pizzas, (pizza, key)=>{
            return (
              <Ons.Col key={key} width="50%">
                <Ons.Card verticalAlign>
                  <img className="img-responsive" src={pizza.image}/>
                  <Ons.Row>
                    <Ons.Col width="80%">
                      <div>
                        <h3>{pizza.name}</h3>
                        <h5>{pizza.price} UAH</h5>
                        <h5>{pizza.weight} g</h5>
                      </div>
                    </Ons.Col>
                    <Ons.Col width="20%">
                      <Ons.Icon onClick={()=>{
                        let cart = Session.get('cart');
                        if(!Array.isArray(cart)){
                          cart = []
                        }
                        cart.push({
                          name: pizza.name,
                          price: pizza.price * this.state.sizes[key],
                          weight: pizza.weight * this.state.sizes[key],
                          img: pizza.image
                        })
                        Session.set('cart', cart)
                        console.log(cart)
                      }} icon='fa-shopping-cart' size={30}/>
                    </Ons.Col>
                  </Ons.Row>
                </Ons.Card>
              </Ons.Col>
            )
          })}

          <Ons.Col width="50%">
            <Ons.Card verticalAlign>
              <img className="img-responsive" src="https://image.freepik.com/free-icon/add-filled-cross-sign_318-75178.jpg"/>
              <Ons.Row>
                <Ons.Col width="100%">
                  <div>
                    <br/>
                    <br/>
                    <Ons.Button style={{margin: '6px'}} modifier='large'>BUILD PIZZA</Ons.Button>
                    <br/>
                  </div>
                </Ons.Col>
              </Ons.Row>
            </Ons.Card>
          </Ons.Col>
        </Ons.Row>
        

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
