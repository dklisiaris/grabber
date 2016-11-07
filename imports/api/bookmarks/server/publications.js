import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Bookmarks from '../bookmarks';

Meteor.publish('bookmarks', function(folderId) {
  check(folderId, String);

  return Bookmarks.find({folderId: folderId});
});
