import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Meteor} from "meteor/meteor";
import {_} from 'lodash';
import {createContainer} from 'meteor/react-meteor-data';
import SimpleWebRTC from 'simplewebrtc';

import {FlowRouter} from "meteor/kadira:flow-router";
import Room from "./Room";
import Rooms from "/imports/api/rooms/rooms.js"
import Books from "/imports/api/books/books.js"



class RoomContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLaunchedActivity: false,
      type: "",
      activity: ""
    };
  }

  componentDidMount() {
    const {roomId} = this.props;
    let webrtc = new SimpleWebRTC({
      localVideoEl: document.getElementById('caller'),
      remoteVideosEl: document.getElementById('target'),
      // immediately ask for camera access
      autoRequestMedia: true,
      debug: true,
      url: Meteor.settings.public.signalingUrl,
      socketio: {forceNew: true},
      media:{video: true, audio: false}
    });
    this.setState({webrtc});
    
    webrtc.on('readyToCall', function () {
        // you can name it anything
        webrtc.joinRoom(roomId, (err, res)=>{
          if(err){
            console.log(err)
          } else {
            Meteor.call('rooms.makeReady', {roomId}, (err, res)=>{
              if(err){
                console.log(err)
              } else {

              }
            })
          }
        });
    });
  }

  componentWillReceiveProps(newProps) {
    const {currentRoom, loading} = newProps;
    const {webrtc} = this.state;
    if(!currentRoom && !loading){
      webrtc.stopLocalVideo();
      webrtc.leaveRoom();
      FlowRouter.go("Dashboard");
    } else {
    }
  }

  componentWillUnmount(){
    const {webrtc} = this.state;
    webrtc.stopLocalVideo();
    webrtc.leaveRoom();

  }

  removeRoom(){
    const {roomId} = this.props;
    const {webrtc} = this.state;
    Meteor.call('rooms.remove', {roomId}, (err, res)=>{
      if(err){
        console.log(err)
      } else {
        webrtc.stopLocalVideo();
        webrtc.leaveRoom();
        FlowRouter.go("Dashboard")
      }
    })
  }

  launchActivity(type, data){
    const {roomId} = this.props;
    Meteor.call("rooms.setState", {type, data, roomId}, (err, res)=>{
      if(err){
        console.log(err)
      } else {

      }
    })
  }

  exitActivity(){
    const {roomId} = this.props;
    Meteor.call("rooms.resetState", {roomId}, (err, res)=>{
      if(err){
        console.log(err)
      } else {

      }
    })
  }

  render() {
    const {currentRoom, books} = this.props;

    return (
      <Room
        removeRoom={this.removeRoom.bind(this)}
        launchActivity={this.launchActivity.bind(this)}
        exitActivity={this.exitActivity.bind(this)}
        roomState = {currentRoom?currentRoom.state:null}
        roomId = {currentRoom?currentRoom._id:null}
        books={books}
        {...this.state}
      />
    );
  };
};


export default createContainer(params => {
  const subscriptions = [];
  subscriptions.push(Meteor.subscribe("rooms.current"));
  subscriptions.push(Meteor.subscribe("books.all"));
  return {
    currentRoom: Rooms.findOne({participants: Meteor.userId()}),
    books: Books.find().fetch(),
    loading: !subscriptions.reduce((prev, subscriber) => prev && subscriber.ready(), true),
  };;
}, RoomContainer);
