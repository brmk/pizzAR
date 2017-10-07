import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Meteor} from "meteor/meteor";
import {_} from 'lodash';
import {createContainer} from 'meteor/react-meteor-data';

import {FlowRouter} from "meteor/kadira:flow-router";
import { ReactiveVar } from 'meteor/reactive-var';
import Dashboard from "./Dashboard";

import Rooms from "/imports/api/rooms/rooms.js"



class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const {currentRoom} = this.props
    if(currentRoom){
      FlowRouter.go("Room", {roomId: currentRoom._id})
    }
  }

  componentDidUpdate() {
    
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    const {currentRoom} = nextProps
    if(currentRoom){
      FlowRouter.go("Room", {roomId: currentRoom._id})
    }
  }

  handleCall(targetId){
    Meteor.call('rooms.insert', {participants:[Meteor.userId(), targetId]}, (err, res)=>{
      if(err){
        console.log(err.reason);
      } else {
        FlowRouter.go("Room", {roomId: res})
      }
    })
  }

  handleLogout(){
    Meteor.logout()
  }

  render() {
    const {onlineUsers, loading} = this.props
    return (
      <Dashboard
        handleLogout={this.handleLogout.bind(this)}
        handleCall={this.handleCall.bind(this)}
        users={onlineUsers}
        loading={loading}
      />
    );
  };
};


export default createContainer(params => {
  const subscriptions = [];
  subscriptions.push(Meteor.subscribe("users.online"));
  subscriptions.push(Meteor.subscribe("rooms.current"));
  return {
    onlineUsers: Meteor.users.find({"status.online": true, _id:{$ne:Meteor.userId()}}).fetch(),
    currentRoom: Rooms.findOne({participants: Meteor.userId(), readyToInvite: true}),
    loading: !subscriptions.reduce((prev, subscriber) => prev && subscriber.ready(), true),
  };
}, DashboardContainer);
