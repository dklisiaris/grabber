import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Meteor } from 'meteor/meteor';
import Folders from './folders';
import { addInvitedFolderToUser } from '../users/methods';
import {rateLimit} from '../../modules/rate-limit.js';
import {can} from '../../modules/permissions.js';

export const addFolder = new ValidatedMethod({
  name: 'folders.add',
  validate: new SimpleSchema({
    name: { type: String },
    description: { type: String, optional: true },
    isPrivate: {type: Boolean},
  }).validator(),
  run({ name, description, isPrivate }) {
    if(can.create.folder()){
      return Folders.insert({
        name: name,
        description: description,
        private: isPrivate,
        views: 0,
        createdBy: Meteor.userId(),
        invitedMembers: [],
        createdAt: new Date()
      });
    }
  },
});

export const removeFolder = new ValidatedMethod({
  name: 'folders.remove',
  validate: new SimpleSchema({
    folderId: { type: String },
  }).validator(),
  run({ folderId }) {
    if(can.delete.folder(folderId)){
      Folders.remove(folderId);
    }
  },
});

export const renameFolder = new ValidatedMethod({
  name: 'folders.rename',
  validate: new SimpleSchema({
    folderId: { type: String },
    newName: {type: String},
  }).validator(),
  run({ folderId, newName }) {
    if(can.edit.folder(folderId)){
      Folders.update(folderId, {$set: {name: newName}});
    }
  },
});

export const setFolderPrivacy = new ValidatedMethod({
  name: 'folders.setPrivacy',
  validate: new SimpleSchema({
    folderId: { type: String },
    isPrivate: {type: Boolean},
  }).validator(),
  run({ folderId, isPrivate }) {
    if(can.edit.folder(folderId)){
      Folders.update(folderId, {$set: {private: isPrivate}});
    }
    else {
      console.log("cannot change privacy");
    }
  },
});

export const incFolderViews = new ValidatedMethod({
  name: 'folders.incViews',
  validate: new SimpleSchema({
    folderId: { type: String },
  }).validator(),
  run({ folderId }) {
    Folders.update(folderId, {$inc: {views: 1}});
  },
});

export const addMemberToFolder = new ValidatedMethod({
  name: 'folder.addMember',
  validate: new SimpleSchema({
    folderId: { type: String },
    memberEmail: {type: String},
  }).validator(),
  run({ folderId, memberEmail }) {
    const member = Meteor.users.findOne({ "emails.address" : memberEmail });
    const folder = Folders.findOne(folderId);

    if(!member){
      throw 'Error: User not found.';
    }
    else if (member._id == folder.createdBy) {
      throw 'Error: Cannot invite folder\'s creator.';
    }
    else if (_.contains(folder.invitedMembers, member._id)) {
      throw 'Error: User is already invited to this folder.';
    }
    else if(can.edit.folder(folderId)){
      Folders.update(folderId, {$push: {invitedMembers: member._id}});
      addInvitedFolderToUser.call({folderId: folderId, userId: member._id}, null);
    }
    else {
      throw 'Error: Could not invite User.';
    }

  },
});

rateLimit({
  methods: [
    addFolder,
    removeFolder,
    renameFolder,
    setFolderPrivacy,
    incFolderViews,
    addMemberToFolder
  ],
  limit: 5,
  timeRange: 1000,
});
