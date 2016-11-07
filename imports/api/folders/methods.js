import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Folders from './folders';

export const addFolder = new ValidatedMethod({
  name: 'folders.add',
  validate: new SimpleSchema({
    name: { type: String },
    description: { type: String, optional: true },
    isPrivate: {type: Boolean},
  }).validator(),
  run({ name, description, isPrivate }) {
    return Folders.insert({
      name: name,
      description: description,
      private: isPrivate,
      views: 0,
      createdBy: Meteor.userId(),
      createdAt: new Date()
    });
  },
});

export const removeFolder = new ValidatedMethod({
  name: 'folders.remove',
  validate: new SimpleSchema({
    folderId: { type: String },
  }).validator(),
  run({ folderId }) {
    Folders.remove(folderId);
  },
});

export const renameFolder = new ValidatedMethod({
  name: 'folders.rename',
  validate: new SimpleSchema({
    folderId: { type: String },
    newName: {type: String},
  }).validator(),
  run({ folderId, newName }) {
    Folders.update(folderId, {$set: {name: newName}});
  },
});

export const setFolderPrivacy = new ValidatedMethod({
  name: 'folders.setPrivacy',
  validate: new SimpleSchema({
    folderId: { type: String },
    isPrivate: {type: Boolean},
  }).validator(),
  run({ folderId, isPrivate }) {
    Folders.update(folderId, {$set: {private: isPrivate}});
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

