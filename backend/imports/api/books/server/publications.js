import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

import Books from "/imports/api/books/books.js"

Meteor.publish('books.all', function(){
	return Books.find()
})