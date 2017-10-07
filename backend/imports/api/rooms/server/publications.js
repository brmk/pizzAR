import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

import Rooms from "/imports/api/rooms/rooms.js"

Meteor.publish('rooms.current', function(){
	return Rooms.find({participants: this.userId, readyToInvite: true})
})