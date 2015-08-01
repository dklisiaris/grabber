Folders = new Mongo.Collection('folders');

// Calculate a default name for a folder in the form of 'Folder A'
Folders.defaultName = function() {
  var nextLetter = '1', nextName = 'New Folder ' + nextLetter;
  while (Folders.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z    
    nextLetter = parseInt(_.last(nextName.split(' '))) + 1;
    nextName = 'New Folder ' + nextLetter;
  }

  return nextName;
};

Meteor.methods({
  addFolder: function (name, description, privacy) {
    // if (! validURL(url) ) {
    //   throw new Meteor.Error("Your url is invalid");
    // }
        
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