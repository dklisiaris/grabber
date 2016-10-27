var SELECTED_BOOKMARK_KEY = 'selectedBoomark';

import './bookmark.html'
import {Bookmark} from '/imports/ui/components/bookmark';

Template.bookmark.helpers({
  thumbnail: function () {
    defaultImage = "http://www.theemailcompany.com/wp-content/uploads/2016/02/no-image-placeholder-big.jpg";
    // console.log(this.image);

    return (this.image === undefined || this.image === null || this.image === '') ? defaultImage : this.image;
  },
  shortTitle: function () {
    if(this.title == null) {
      return null;
    }
    shortTitle = this.title.substring(0, 37);
    return (this.title.length > 37) ? shortTitle + '...' : shortTitle;
  },
  shortUrl:function () {
    return this.url.replace(/.*?:\/\//g,"").replace("www.","");
  },
  dropdownClass: function () {
    return 'dropdown-' + this._id;
  },
  BookmarkComponent() {
    return Bookmark;
  },
});

Template.bookmark.events({
  "click .remove-bookmark": function () {
    var folder = Folders.findOne(this.folderId);
    if (! Meteor.user() || folder.createdBy !== Meteor.userId()) {
      return alert("You can remove bookmarks that belong to your own folders.");
    }

    Meteor.call("removeBookmark", this._id);

    var wall = new freewall('#grid');
    wall.fitWidth();
  },
  "click .refresh-bookmark": function () {
    Meteor.call("refreshBookmark", this._id);
  },
  "click .edit-bookmark": function () {
    Session.set(SELECTED_BOOKMARK_KEY, this._id);
    $('.chat-collapse').sideNav('show');
  },
  "click .clickable-url": function () {
    Meteor.call("incBookmarkViews", this._id);
    Meteor.call("incFolderViews", this.folderId);
  },
});


Template.bookmark.onRendered(function () {
  // Materialize Dropdown
  // $('.dropdown-button').dropdown({
  //   inDuration: 300,
  //   outDuration: 125,
  //   constrain_width: true, // Does not change width of dropdown to that of the activator
  //   hover: false, // Activate on click
  //   alignment: 'left', // Aligns dropdown to left or right edge (works with constrain_width)
  //   gutter: 0, // Spacing from edge
  //   belowOrigin: true // Displays dropdown below the button
  // });

  var wall = new freewall('#grid');
  wall.reset({
    selector: '.grid-item',
    onResize: function() {
      this.fitWidth();
    }
  });
  wall.fitWidth();

});
