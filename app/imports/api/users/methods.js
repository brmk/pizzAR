import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Match } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { _ } from 'meteor/underscore';

import rateLimit from '/imports/modules/rate-limit.js';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import SimpleSchema from 'simpl-schema';



export const editProfile = new ValidatedMethod({
    name: 'users.updateProfile',
    validate: new SimpleSchema({
        firstName: { type: String, optional: false },
        lastName: { type: String, optional: false },
        birthDate: { type: Date, optional: true },
        about: { type: String, optional: true },
        gender: { type: String, optional: true }
    }).validator(),
    run(newProfile) {
        if (!this.userId) {
            throw new Meteor.Error('Access Denied');
        }

        let profile = Meteor.user().profile;
        newProfile.image = profile.image;
        newProfile.birthDate = moment(newProfile.birthDate, 'YYYY-MM-DD').toDate();
        Meteor.users.update({
            _id: this.userId
        }, {
            $set: {
                profile: newProfile
            }
        })
    }
})

rateLimit({
    methods: [
        editProfile,
    ],
    limit: 5,
    timeRange: 1000,
});
