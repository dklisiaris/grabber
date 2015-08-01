Template.header.events({
  "click .logout": function() {
    Meteor.logout();  
    Meteor.setTimeout(function(){ Router.go('home'); }, 10);  
  }  
});

Template.header.helpers({
  emailLocalPart: function() {
    var email = Meteor.user().emails[0].address;
    return email.substring(0, email.indexOf('@'));
  }
});