import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.publish('users.online', function(limit=25){
	check(limit, Number);
	return Meteor.users.find({"status.online": true, _id:{$ne: this.userId}}, {limit})
})