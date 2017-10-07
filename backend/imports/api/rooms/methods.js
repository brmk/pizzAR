import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

import { ValidatedMethod } from "meteor/mdg:validated-method";
import SimpleSchema from "simpl-schema";
import Rooms from "./rooms.js"

export const createRoom = new ValidatedMethod({
  name: "rooms.insert",
  validate: new SimpleSchema({
    participants: { type: Array, optional: false, blackbox: true },
  }).validator(),
  run({ participants}) {
    
    Rooms.remove({participants:{$in: participants}});
    let roomId = Rooms.insert({
      participants,
      createdAt: new Date(),
      readyToInvite: false
    });

    console.log(
      `[rooms.insert] Created room ${roomId} for users ${participants}. args: ${JSON.stringify(
        arguments
      )}`
    );
    return roomId;
  }
});

export const makeReady = new ValidatedMethod({
  name: "rooms.makeReady",
  validate: new SimpleSchema({
    roomId: { type: String, optional: false},
  }).validator(),
  run({ roomId}) {
    
    Rooms.update({_id: roomId}, {$set:{readyToInvite: true}});

    console.log(
      `[rooms.makeReady] Ready to invite in room ${roomId}. args: ${JSON.stringify(
        arguments
      )}`
    );
  }
});
export const setState = new ValidatedMethod({
  name: "rooms.setState",
  validate: new SimpleSchema({
    roomId: { type: String, optional: false},
    type: {type: String, optional: false},
    data: {type: Object, optional: false, blackbox: true}
  }).validator(),
  run({ roomId, type, data}) {
    
    Rooms.update({_id: roomId}, {$set:{state: {type, data}}});

    console.log(
      `[rooms.setState] Set state from room ${roomId}. args: ${JSON.stringify(
        arguments
      )}`
    );
  }
});

export const updateState = new ValidatedMethod({
  name: "rooms.updateState",
  validate: new SimpleSchema({
    roomId: { type: String, optional: false},
    state: {type: Object, optional: false, blackbox: true}
  }).validator(),
  run({ roomId, state}) {
    
    Rooms.update({_id: roomId}, {$set:state});

    console.log(
      `[rooms.updateState] Update state for room ${roomId}. args: ${JSON.stringify(
        arguments
      )}`
    );
  }
});

export const resetState = new ValidatedMethod({
  name: "rooms.resetState",
  validate: new SimpleSchema({
    roomId: { type: String, optional: false},
  }).validator(),
  run({ roomId}) {
    
    Rooms.update({_id: roomId}, {$unset:{state: ""}});

    console.log(
      `[rooms.resetState] Reset state for room room ${roomId}. args: ${JSON.stringify(
        arguments
      )}`
    );
  }
});

export const removeRoom = new ValidatedMethod({
  name: "rooms.remove",
  validate: new SimpleSchema({
    roomId: { type: String, optional: false},
  }).validator(),
  run({ roomId}) {
    
    Rooms.remove({_id: roomId});

    console.log(
      `[rooms.remove] Removed room ${roomId}. args: ${JSON.stringify(
        arguments
      )}`
    );
  }
});

export const removeRoomByParticipant = new ValidatedMethod({
  name: "rooms.removeByParticipant",
  validate: new SimpleSchema({
    participant: { type: String, optional: false},
  }).validator(),
  run({ participant}) {
    
    Rooms.remove({participants: participant});
    
    console.log(
      `[rooms.removeByParticipant] Removed room by participant ${participant}. args: ${JSON.stringify(
        arguments
      )}`
    );
  }
});