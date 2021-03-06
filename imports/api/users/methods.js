import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import Users from './users';
import {rateLimit} from '../../modules/rate-limit.js';

export const addInvitedFolderToUser = new ValidatedMethod({
  name: 'user.addInvitedFolder',
  validate: new SimpleSchema({
    folderId: { type: String },
    userId: {type: String},
  }).validator(),
  run({ folderId, userId }) {
    Users.update(userId, { $push: { 'profile.invitedFolders': folderId }})
  },
});

rateLimit({
  methods: [
    addInvitedFolderToUser
  ],
  limit: 5,
  timeRange: 1000,
});
