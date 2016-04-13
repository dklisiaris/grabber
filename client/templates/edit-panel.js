Template.editPanel.helpers({
  folders: function () {
    return Folders.find({}, {sort: {views: -1}});
  },
});


Template.editPanel.onCreated(function() {
  var self = this;
  if(Meteor.userId()){
    self.subscribe("privateFolders");
  }
  else if(FlowRouter.getRouteName() === 'home'){
    self.subscribe("defaultFolders");
  }
});