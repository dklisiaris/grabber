import './only-header.html';
import {AppNavigation} from '/imports/ui/components/app-navigation';

Template.onlyHeader.helpers({
  AppNavigation() {
    return AppNavigation;
  },

  folders() {
    return Folders.find({}, {sort: {views: -1}});
  },

  email() {
    if(Meteor.user()){
      return Meteor.user().emails[0].address;
    }
  },

  username() {
    if(Meteor.user()){
      let username = Meteor.user().username;
      const email = Meteor.user().emails[0].address;
      if(!username){
        username = email.substring(0, email.indexOf('@'));
      }
      return username;
    }
  }
});

Template.folders.onCreated(function() {
  var self = this;
  self.autorun(function() {
    if(Meteor.userId()){
      self.subscribe("privateFolders");
    }
  });
});
