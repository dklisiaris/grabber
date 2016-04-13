Template.sidebar.helpers({
  folders: function () {
    return Folders.find({}, {sort: {views: -1}});
  }
});


Template.sidebar.onCreated(function() {
  var self = this;
  self.autorun(function() {
    if(Meteor.userId()){
      self.subscribe("privateFolders");
    }
    else if(FlowRouter.getRouteName() === 'home'){
      self.subscribe("defaultFolders");
    }
  });

});