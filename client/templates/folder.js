Template.folder.events({
  "click .clickable-folder": function () {       
    Meteor.call("incFolderViews", this._id);
  },
});

Template.folder.helpers({
  icon_url: function (){
    if(this.icon)
      return "/img/icons/" + this.icon;
    else
      return "/img/icons/folder-c.png";
  }

});