Template.folder.events({
  "click .clickable-folder": function () {       
    Meteor.call("incFolderViews", this._id);
  },
});