import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Books = new Mongo.Collection('books');

export default Books;


Books.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Books.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});