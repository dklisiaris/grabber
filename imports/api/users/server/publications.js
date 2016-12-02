import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Users from '../users';

Meteor.publish('allUsers', () => {
  return Users.find();
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

