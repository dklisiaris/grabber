import Folders from './folders';

Meteor.methods({
  addFolder: function (name, description, privacy) {

    return Folders.insert({
      name: name,
      description: description,
      private: privacy,
      views: 0,
      createdBy: Meteor.userId(),
      createdAt: new Date()
    });
  },

  removeFolder: function (folderId) {
    Folders.remove(folderId);
  },

  renameFolder: function (folderId, newName) {
    Folders.update(folderId, {$set: {name: newName}});
  },

  setPrivacy: function (folderId, isPrivate) {
    Folders.update(folderId, {$set: {private: isPrivate}});
  },

  incFolderViews: function (folderId) {
    Folders.update(folderId, {$inc: {views: 1}});
  },
});
