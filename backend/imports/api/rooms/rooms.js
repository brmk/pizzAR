import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Rooms = new Mongo.Collection('rooms');

export default Rooms;


Rooms.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Rooms.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Meteor.users.find({ "status.online": true }).observe({
  added: function(id) {
    // id just came online
  },
  removed: function(user) {
    
  }
});