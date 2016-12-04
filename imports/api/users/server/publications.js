import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Users from '../users';

Meteor.publish('allUsers', () => {
  return Users.find();
});

Meteor.publish('userData', (userId) => {
  return Meteor.users.find(userId, {fields: {profile: 1}});
});

Meteor.publish('userMiniProfile', (userId) => {
  return Users.find(userId, {
    fields: {
      'username': 1,
      'profile.fullname': 1,
      'profile.avatarUrl': 1,
    },
  });
});

Meteor.publish('userInvitedFolders', (userId) => {
  return Users.find(userId, {
    fields: {
      'profile.invitedFolders': 1,
    },
  });
});
