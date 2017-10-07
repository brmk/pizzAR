import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.publish('users.byIds', (userIds) => {
    check(userIds, Array)
    return Meteor.users.find({
        _id: {
            $in: userIds
        }
    })
});