import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import Books from "./books.js"

export const createBook = new ValidatedMethod({
  name: "books.insert",
  validate: new SimpleSchema({
    name: { type: String, optional: false},
    key: {type: String, optional: false},
    rootUrl: {type: String, optional: false},
    fileRoot: {type: String, optional: true},
    fileExtension: {type: String, optional: true},
    pagesCount: {type: Number, optional: false},
  }).validator(),
  run({ name, key, rootUrl, fileRoot, fileExtension, pagesCount }) {
    
    let bookId = Books.insert({
      name,
      key,
      rootUrl,
      fileRoot,
      fileExtension,
      pagesCount,
      createdAt: new Date(),
    });

    console.log(
      `[books.insert] Created book ${bookId}. args: ${JSON.stringify(
        arguments
      )}`
    );
    return bookId;
  }
});

// {
//     "_id" : "zNxps8XCPLhqGrYtH",
//     "name" : "Humpty Dumpty",
//     "key" : "humpty_dumpty",
//     "rootUrl" : "/books",
//     "fileRoot" : "img_book_humpty_dumpty_",
//     "fileExtension" : "jpg",
//     "pagesCount" : 16,
//     "createdAt" : ISODate("2017-10-06T15:33:17.454Z")
// }