import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";

export const registerUser = new ValidatedMethod({
  name: "users.insert",
  validate: new SimpleSchema({
    user: { type: Object, optional: false, blackbox: true },
  }).validator(),
  run({ user}) {
  	if(!user.password || !user.email){
      throw new Meteor.Error('email-or-password-missing', `Email or password missing!`);
    }
    
    if(!user.profile.firstName || !user.profile.lastName){
      throw new Meteor.Error('firstName-or-last-name-missing', `First name or Last name missing!`);
    }
    
    let userId = Accounts.createUser(user);

    console.log(
      `[users.insert] Added ${userId} to Users. args: ${JSON.stringify(
        arguments
      )}`
    );
    return userId;
  }
});