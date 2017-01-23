import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Bookmarks from '../bookmarks';
import { Images } from '../bookmarks';

Meteor.publish('bookmarks', function(folderId) {
  check(folderId, String);

  return Bookmarks.find({folderId: folderId});
});

Meteor.publish('webshots', function(folderId) {
  check(folderId, String);

  return Images.find({folderId: folderId});
});

Meteor.publish('emptyBookmarks', function() {
  return this.ready();
});
