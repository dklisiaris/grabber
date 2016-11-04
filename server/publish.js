Meteor.publish('allFolders', function() {
  return Folders.find();
});

Meteor.publish('allBookmarks', function() {
  return Bookmarks.find();
});


Meteor.publish('defaultFolders', function() {
  return Folders.find({isDefault: true, private: false});
});

Meteor.publish('publicFolders', function() {
  return Folders.find({isDefault: false, private: false});
});

Meteor.publish('privateFolders', function() {
  if (this.userId) {
    return Folders.find({isDefault: false, createdBy: this.userId});
  } else {
    this.ready();
  }
});

Meteor.publish('currentFolder', function(folderId){
  check(folderId, String);

  return Folders.find(folderId);
});

Meteor.publish('bookmarks', function(folderId) {
  check(folderId, String);

  return Bookmarks.find({folderId: folderId});
});
