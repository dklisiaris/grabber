var EDITING_KEY = 'editingFolder';
Session.setDefault(EDITING_KEY, false);

Template.folderActions.helpers({
  // folders: function () {
  //   return Folders.find({}, {sort: {createdAt: -1}});
  // },
  currentFolder: function(){
    return Folders.findOne(FlowRouter.getParam('_id'));
  },
  editing: function() {
    return Session.get(EDITING_KEY);
  }
});

Template.folderActions.events({
  'click .js-cancel': function() {
    Session.set(EDITING_KEY, false);
  },

  'click .js-toggle-privacy': function() {
    toggleFolderPrivacy(this);
  },

  'blur input[type=text]': function(event, instance) {
    // if we are still editing (we haven't just clicked the cancel button)
    if (Session.get(EDITING_KEY))
      saveFolder(this, instance);
  },

  "submit .js-edit-form": function(event, instance) {
    event.preventDefault();
    saveFolder(this, instance);
    return false;
  },
  // handle mousedown otherwise the blur handler above will swallow the click
  // on iOS, we still require the click event so handle both
  'mousedown .js-cancel, click .js-cancel': function(event) {
    event.preventDefault();
    Session.set(EDITING_KEY, false);
  },

  'change .folder-edit': function(event, instance) {
    if ($(event.target).val() === 'edit') {
      editFolder(this, instance);
    }
    event.target.selectedIndex = 0;
  },
  
  'click .js-edit-folder': function(event, instance) {
    editFolder(this, instance);
  }, 

  'click .js-delete-folder': function(event, instance) {
    deleteFolder(this, instance);    
  }
});

Template.folderActions.onRendered(function(){
  
});

Template.folderActions.onCreated(function(){
  var self = this;
  
  if(FlowRouter.getRouteName() === 'folder' || FlowRouter.getRouteName() === 'test'){
    let currentFolderId = FlowRouter.getParam('_id');

    self.subscribe('currentFolder', currentFolderId);
    this.currentFolderId = new ReactiveVar(currentFolderId);
  } 
});

var editFolder = function(folder, instance) {
  Session.set(EDITING_KEY, true);
  
  // force the instance to redraw based on the reactive change
  Tracker.flush();
  instance.$('.js-edit-form input[type=text]').focus();
};

var saveFolder = function(folder, instance) {
  Session.set(EDITING_KEY, false);  
  Meteor.call("renameFolder", folder._id, instance.$('[name=name]').val());
};

var deleteFolder = function(folder) {
  if (! Meteor.user()) {
    return alert("Please sign in or create an account to delete folders.");
  }

  if (folder.createdBy !== Meteor.userId()) {
    return alert("You can delete only your own folders.");
  }

  if (Folders.find({createdBy: Meteor.userId()}).count() === 1) {
    return alert("Sorry, you cannot delete the final folder!");
  }

  var message = "Are you sure you want to delete the folder " + folder.name + "?";
  if (confirm(message)) {
    // we must remove each item individually from the client
    Bookmarks.find({folderId: folder._id}).forEach(function(bookmark) {      
      Meteor.call("removeBookmark", bookmark._id);
    });    
    Meteor.call("removeFolder", folder._id);

    
    Meteor.setTimeout(function(){ FlowRouter.go('home'); }, 10);
    return true;
  } else {
    return false;
  }
};

var toggleFolderPrivacy = function(folder) {
  if (! Meteor.user()) {
    return alert("Please sign in or create an account to make private folders.");
  }
  if (folder.createdBy === Meteor.userId()) {    
    Meteor.call("setPrivacy", folder._id, !folder.private);
  }
};