Meteor.publish('publicFolders', function() {  
  return Folders.find({private: false});
});

Meteor.publish('privateFolders', function() {  
  if (this.userId) {
    return Folders.find({createdBy: this.userId});
  } else {
    this.ready();
  }
});

Meteor.publish('bookmarks', function(folderId) {  
  check(folderId, String);
  
  return Bookmarks.find({folderId: folderId});
});
