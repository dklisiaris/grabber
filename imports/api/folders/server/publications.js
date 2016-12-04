import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Folders from '../folders';

Meteor.publish('allFolders', () => {
  return Folders.find();
});

Meteor.publish('defaultFolders', () => {
  return Folders.find({isDefault: true, private: false});
});

Meteor.publish('publicFolders', () => {
  return Folders.find({isDefault: false, private: false});
});

Meteor.publish('privateFolders', (userId) => {
  return Folders.find({isDefault: false, createdBy: userId});
});

Meteor.publish('accessedFolders', (userId, invitedFolderIds) => {
  return Folders.find({
    $or: [
      {isDefault: false, createdBy: userId},
      {_id: {$in: invitedFolderIds}}
    ]
  });
});

Meteor.publish('currentFolder', (folderId) => {
  check(folderId, String);

  return Folders.find(folderId);
});

Meteor.publish('invitedUsers', (folderId) => {
  const invitedUsersIds = Folders.find(folderId).invitedUsers;
  return Meteor.users.find("_id": { "$in": invitedUsersIds });
});
