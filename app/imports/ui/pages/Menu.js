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
import WorldInit from '/imports/modules/world';

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
        <div className='right' style={{marginRight: "20px"}}>
          <Ons.Icon onClick={()=>{
            FlowRouter.go('Cart')
          }} icon='fa-shopping-cart' size={30}/>
        </div>
      </Ons.Toolbar>
    );
  }

  componentDidMount() {
    console.log('initializing at Menu.js')
  }

  renderCustomAR(){
    function onRender(){

      var World = {
        loaded: false,

        init: function initFn() {
          this.createOverlays();
        },

        createOverlays: function createOverlaysFn() {
          /*
            First an AR.ImageTracker needs to be created in order to start the recognition engine. It is initialized with a AR.TargetCollectionResource specific to the target collection that should be used. Optional parameters are passed as object in the last argument. In this case a callback function for the onTargetsLoaded trigger is set. Once the tracker loaded all its target images, the function worldLoaded() is called.

            Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
            Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a certain group of targets.
          */
              this.targetCollectionResource = new AR.TargetCollectionResource("http://192.168.101.140:3000/assets/pizza.wtc", {
              });

              this.tracker = new AR.ImageTracker(this.targetCollectionResource, {
                  onTargetsLoaded: this.worldLoaded,
                  onError: function(errorMessage) {
                    alert(errorMessage);
                  }
              });

          /*
            The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.ImageTrackable) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
          */

          /* Create overlay for page one */
          var imgOne = new AR.ImageResource("http://192.168.101.140:3000/assets/imageOne.png");
          
          var overlayOne = new AR.ImageDrawable(imgOne, 2, {
            translate: {
              
            }

          });

          /*
            The last line combines everything by creating an AR.ImageTrackable with the previously created tracker, the name of the image target and the drawable that should augment the recognized image.
            Please note that in this case the target name is a wildcard. Wildcards can be used to respond to any target defined in the target collection. If you want to respond to a certain target only for a particular AR.ImageTrackable simply provide the target name as specified in the target collection.
          */
          var pageOne = new AR.ImageTrackable(this.tracker, "*", {
            drawables: {
              cam: overlayOne
            },
            onImageRecognized: this.removeLoadingBar,
                  onError: function(errorMessage) {
                    alert(errorMessage);
                  }
          });
        },

        removeLoadingBar: function() {
          if (!World.loaded) {
            var e = document.getElementById('loadingMessage');
            e.parentElement.removeChild(e);
            World.loaded = true;
          }
        },

        worldLoaded: function worldLoadedFn() {
          var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
          var cssDivRight = " style='display: table-cell;vertical-align: middle; text-align: left;'";
          document.getElementById('loadingMessage').innerHTML =
            "<div" + cssDivLeft + ">Scan Target &#35;1 (surfer):</div>" +
            "<div" + cssDivRight + "><img src='assets/surfer.png'></img></div>";
        }
      };

      World.init();
    }

    WorldInit.initialize(onRender);
    
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
                        <div style={{fontSize: "20px"}}>
                          <span 
                            style={{
                              color: this.state.sizes[key] == 0.7?"red":"black",
                              paddingRight: "10px"
                            }}
                            onClick={()=>{
                              let sizes = this.state.sizes;
                              sizes[key] = 0.7;
                              this.setState({sizes})
                            }}
                          >S</span>
                          <span 
                            style={{
                              color: this.state.sizes[key] == 1?"red":"black",
                              paddingRight: "10px"
                            }}
                            onClick={()=>{
                              let sizes = this.state.sizes;
                              sizes[key] = 1;
                              this.setState({sizes})
                            }}
                          >M</span>
                          <span 
                            style={{
                              color: this.state.sizes[key] == 1.5?"red":"black",
                              paddingRight: "10px"
                            }}
                            onClick={()=>{
                              let sizes = this.state.sizes;
                              sizes[key] = 1.5;
                              this.setState({sizes})
                            }}
                          >L</span>
                        </div>
                      </div>
                    </Ons.Col>
                    <Ons.Col width="20%">
                      <Ons.Icon onClick={()=>{
                        let cart = Session.get('cart');
                        if(!Array.isArray(cart)){
                          cart = []
                        }
                        cart.push({
                          id: Meteor.uuid(),
                          name: pizza.name,
                          price: pizza.price * this.state.sizes[key],
                          weight: pizza.weight * this.state.sizes[key],
                          img: pizza.image,
                          size: this.state.sizes[key]
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
                    <Ons.Button onClick={()=>{FlowRouter.go('Builder')}} style={{margin: '6px'}} modifier='large'>BUILD PIZZA</Ons.Button>
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
