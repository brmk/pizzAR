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

let ingridientsPrices = {
  ham: 15,
  mushroom: 15,
  cheese: 10,
  pineapple: 20,
  salami: 15,
  tomato: 10
}
let ingridients = ["ham", "mushroom", "pineapple", "salami", "tomato", /*"cheese"*/];

export default class Builder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingridients: [],
      size: 1
    };
  }

  calculatePizzaCost(){
    let total = 20;

    this.state.ingridients.forEach((ingridient)=>{
      total+=ingridientsPrices[ingridient]
    })
    return (total*this.state.size).toFixed();
  }

  renderCustomAR(){
    const {ingridients, size} = this.state;
    WorldInit.initialize({ingridients, size});
  }

  addToCart(){
    let cart = Session.get('cart');
    if(!Array.isArray(cart)){
      cart = []
    }
    cart.push({
      id: Meteor.uuid(),
      name: 'Custom',
      ingridients: this.state.ingridients,
      price: this.calculatePizzaCost(),
      weight: 500,
      img: 'http://www.seriouseats.com/images/2017/04/20170411-pizza-oven-testing-roccbox-top.jpg',
      size: this.state.size
    })
    Session.set('cart', cart)
    this.setState({ingridients:[], size: 1})
    FlowRouter.go('Menu')
  }
  
  renderToolbar() {
    return (
      <Ons.Toolbar>
        <div className='left'>
          <Ons.BackButton onClick={()=>{history.back()}}>Back</Ons.BackButton>
        </div>
        <div className='center'>Builder</div>
      </Ons.Toolbar>
    );
  }

  componentDidMount() {
    console.log('initializing at Builder.js')
  }

  render(){
    return (



      <div className="Builder">
        <Ons.Page renderToolbar={this.renderToolbar}>
          <Ons.Row verticalAlign='center' className='center'>
            <Ons.Col width='100%' className='center'>
              <div style={{textAlign:'center'}}>
                <div>{this.calculatePizzaCost()}</div>
                <div style={{position:'relative', display:'inline-block'}}>
                  <img className="img-responsive" style={{maxHeight: "300px"}} src='/assets/pizza-base.png'/>
                  {
                    this.state.ingridients.map((ingridient)=>{
                      return <img key={ingridient} className="img-responsive img-overlay" style={{maxHeight: "300px", position:'absolute', top:0, left:0}} src={`/assets/${ingridient}.png`}/>
                    })
                  }
                </div>
              </div>
            </Ons.Col>
          </Ons.Row>
          <Ons.Row verticalAlign='center' className='center'>
            {ingridients.map((ingridient)=>{
              return (
                <Ons.Col key={ingridient} width="20%">
                  <div style={{textAlign: 'center'}}>
                    <img
                      className={`image-responsive ${this.state.ingridients.indexOf(ingridient)!=-1?'active':''}`}
                      style={{padding: "5px", maxHeight:"50px"}} src={`/img/${ingridient}.jpg`} 
                      onClick={()=>{
                        let ingridients = this.state.ingridients
                        if(ingridients.indexOf(ingridient)!=-1){
                          _.pull(ingridients, ingridient)
                        } else {
                          ingridients.push(ingridient)
                        }

                        this.setState({ingridients})
                      }}
                    />
                  </div>
                </Ons.Col>
              )
            })

            }

            <div style={{fontSize: "20px", textAlign:'center', width:'100%', marginTop: '10px'}}>
              <span 
                style={{
                  backgroundColor: this.state.size == 0.7?'#009588':'transparent',
                  color: this.state.size == 0.7?"white":"black",
                }}
                className="size-label"
                onClick={()=>{
                  this.setState({size:0.7})
                }}
              >S</span>
              <span 
                style={{
                  backgroundColor: this.state.size == 1?'#009588':'transparent',
                  color: this.state.size == 1?"white":"black",
                }}
                className="size-label"
                onClick={()=>{
                  this.setState({size: 1})
                }}
              >M</span>
              <span 
                style={{
                  backgroundColor: this.state.size == 1.5?'#009588':'transparent',
                  color: this.state.size == 1.5?"white":"black",
                }}
                className="size-label"
                onClick={()=>{
                  this.setState({size: 1.5})
                }}
              >L</span>
            </div>
            
          </Ons.Row>

          <div style={{marginTop:'35px'}}>
            <Ons.Button style={{margin: '6px'}} onClick={()=>{this.renderCustomAR()}} modifier='large'>See live</Ons.Button>
            <Ons.Button style={{margin: '6px'}} onClick={()=>{this.addToCart()}} modifier='large'>Add to cart</Ons.Button>
          </div>
          {/*<Ons.Button onClick={()=>{WorldInit.initialize()}}>Hello</Ons.Button>*/}
        </Ons.Page>
      </div>
    );
  }
}


