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

  renderRow(row, self) {
    let quantity = row.quantity || 1;
    return (
      <Ons.ListItem key={row.id}>
        <div className='left'>
          <img src={row.img} className='list-item__thumbnail' />
        </div>
        <div className='center'>
          {row.name}
          
          {row.name=='Custom'?
            <div>
              {`  | Ingridients: `}
              {row.ingridients.map((ingridient)=>{
                return (<span key={ingridient}>{`${ingridient}${" "}`}</span>)
              })}
            </div>
            
          :''
          }
        </div>
        <div className='right'>
          {sizes[row.size]}
          <Ons.Icon onClick={()=>{
            let cart = Session.get('cart');
            if(!Array.isArray(cart)){
              cart = []
            }
            _.remove(cart, function(n) {
              return n.id == row.id;
            })
            self.setState({pizzas:cart})
            Session.set('cart', cart)
          }} icon='fa-times' size={15}/>
        </div>
      </Ons.ListItem>
    );
  }

  makeOrder(){
    let order = {
      ordererAddress: this.state.address,
      ordererPhone: this.state.phone,
      pizzas: this.state.pizzas,
      orderPrice: this.calculateTotal()
    }

    let remoteUrl = Meteor.absoluteUrl();
    let remote = DDP.connect(remoteUrl);

    remote.call('orders.insert', order, (err, res)=>{
      if(err){
        alert(JSON.stringify(err))
      } else{
        Session.set('cart', [])
        alert('Thank you for your order. Wait for a call');
        history.back();
      }
    })
  }

  calculateTotal(){
    let cart = this.state.pizzas;
    let total = 0;

    if(!cart || cart.length<1){return 0}

    cart.forEach((pizza)=>{ 
      total+=pizza.price
    })
    return parseInt(total).toFixed()
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
          <section style={{textAlign: 'center', marginTop:'20px'}}>
            <Ons.Row verticalAlign='center' className='center'>
              <Ons.Col width='100%' className='center'>
                <p>
                  <Ons.Input
                    value={this.state.phone}
                    onChange={(e)=>{this.handlePhoneChange(e)}}
                    modifier='material'
                    
                    placeholder='Phone' />
                </p>
              </Ons.Col>
              
            </Ons.Row>
            <Ons.Row verticalAlign='center' className='center'>
              <Ons.Col>
                <p>
                  <Ons.Input
                    value={this.state.address}
                    onChange={(e)=>{this.handleAddressChange(e)}}
                    modifier='material'
                    
                    placeholder='Address' />
                </p>
              </Ons.Col>
              
            </Ons.Row>
          
          <Ons.List
            dataSource={Session.get('cart') || []}
            renderRow={(row)=>{return this.renderRow(row, this)}}
            renderHeader={() => <Ons.ListHeader>Cart</Ons.ListHeader>}
          />
          <div>
            Total: {this.calculateTotal()} UAH
          </div>
          <Ons.Button style={{margin: '6px'}} onClick={()=>{this.makeOrder()}} modifier='large'>Make Order</Ons.Button>
          {/*<Ons.Button onClick={()=>{WorldInit.initialize()}}>Hello</Ons.Button>*/}

          </section>
        </Ons.Page>
      </div>
    );
  }
}

Cart.propTypes = {
  // loading: PropTypes.bool,
};


