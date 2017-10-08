//----
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import {_} from 'lodash';
import {Session} from 'meteor/session'
import {FlowRouter} from "meteor/kadira:flow-router"
// import AR from 'com.wikitude.phonegap.WikitudePlugin';
//----
import Logger from '/imports/modules/logger';
import WorldInit from '/imports/modules/world';
//----
// const AR = window.WikitudePlugin;
import OnsenUI from 'onsenui';
import Ons from 'react-onsenui'; 

let sizes = {
  "0.7": 'Small',
  "1": 'Medium',
  "1.5": 'Large'
}
export default class Cart extends Component {
  constructor(props) {
    super(props);
    let pizzas = Session.get('cart');
    this.state = {
      phone: "",
      address: "",
      pizzas
    };
  }
  
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
          <Ons.BackButton onClick={()=>{history.back()}}>Back</Ons.BackButton>
        </div>
        <div className='center'>Cart</div>
      </Ons.Toolbar>
    );
  }

  renderRow(row, index, state) {
    let quantity = row.quantity || 1;
    return (
      <Ons.ListItem key={index}>
        <div className='left'>
          <img src={row.img} className='list-item__thumbnail' />
        </div>
        <div className='center'>
          {row.name}
        </div>
        <div className='right'>
          {sizes[row.size]}
        </div>
      </Ons.ListItem>
    );
  }

  calculateTotal(){
    let cart = this.state.pizzas;
    let total = 0;

    if(!cart || cart.length<1){return 0}

    cart.forEach((pizza)=>{ 
      total+=pizza.price
    })

    return total
  }

  handlePhoneChange(e) {
    this.setState({phone: e.target.value});
  }

  handleAddressChange(e) {
    this.setState({address: e.target.value});
  }

  componentDidMount() {
    console.log('initializing at Cart.js')
  }

  render(){
    return (

      <div className="Cart">
        <Ons.Page renderToolbar={this.renderToolbar}>
          <Ons.Row verticalAlign='center' className='center'>
            <Ons.Col width='100%' className='center'>
              <Ons.Input
                value={this.state.phone}
                onChange={this.handlePhoneChange}
                modifier='underbar'
                
                placeholder='Phone' />
            </Ons.Col>
            
          </Ons.Row>
          <Ons.Row verticalAlign='center' className='center'>
            <Ons.Col>
              <Ons.Input
                value={this.state.address}
                onChange={this.handleAddressChange}
                modifier='underbar'
                
                placeholder='Address' />
            </Ons.Col>
            
          </Ons.Row>
          
          <Ons.List
            dataSource={Session.get('cart') || []}
            renderRow={this.renderRow}
            renderHeader={() => <Ons.ListHeader>Cart</Ons.ListHeader>}
          />
          <div>
            Total: {this.calculateTotal()}
          </div>
          <Ons.Button style={{margin: '6px'}} modifier='large'>Make Order</Ons.Button>
          {/*<Ons.Button onClick={()=>{WorldInit.initialize()}}>Hello</Ons.Button>*/}
        </Ons.Page>
      </div>
    );
  }
}

Cart.propTypes = {
  // loading: PropTypes.bool,
};


