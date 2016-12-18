import { Meteor } from 'meteor/meteor';
import Folders from '../api/folders/folders';
import Bookmarks from '../api/bookmarks/bookmarks';

export const can = ({
  delete: ({
    bookmark(bookmarkId) {
      return userOwnsBookmark(bookmarkId);
    },
    folder(folderId) {
      userOwnsFolder(folderId);
    }
  }),
  edit: ({
    bookmark(bookmarkId) {
      return userOwnsBookmark(bookmarkId);
    },
    folder(folderId) {
      userOwnsFolder(folderId);
    }
  }),
  create: ({
    bookmark(folderId) {
      return userOwnsFolder(folderId);
    },
    folder() {
      if(Meteor.userId()) return true;
      else return false;
    }
  }),
})

const userOwnsBookmark = (bookmarkId) => {
  const bookmark = Bookmarks.findOne(bookmarkId);
  const folder = Folders.findOne(bookmark.folderId);
  return (folder.createdBy === Meteor.userId());
}

const userOwnsFolder = (folderId) => {
  const folder = Folders.findOne(folderId);
  return (folder.createdBy === Meteor.userId());
}
