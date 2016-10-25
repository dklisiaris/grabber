import './folders.html'
import {FoldersView} from '/imports/ui/views/folders';

Template.folders.helpers({
  FoldersComponent() {
    return FoldersView;
  },
  folders: function () {
    return Folders.find({}, {sort: {views: -1}});
  }
});

Template.folders.onCreated(function() {
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
