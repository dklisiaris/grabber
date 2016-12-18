import { Meteor } from 'meteor/meteor';
import Folders from '../api/folders/folders';
import Bookmarks from '../api/bookmarks/bookmarks';

export const can = ({
  delete: ({
    bookmark(bookmarkId) {
      return userOwnsBookmark(bookmarkId);
    },
    folder(folderId) {
      return userOwnsFolder(folderId);
    }
  }),
  edit: ({
    bookmark(bookmarkId) {
      return userOwnsBookmark(bookmarkId);
    },
    folder(folderId) {
      return userOwnsFolder(folderId);
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
  view: ({
    folder(folderId) {
      return userOwnsOrPublicFolder(folderId);
    }
  }),
})

const userOwnsBookmark = (bookmarkId) => {
  const bookmark = Bookmarks.findOne(bookmarkId);
  const folder = Folders.findOne(bookmark.folderId);
  return (folder && folder.createdBy === Meteor.userId());
}

const userOwnsFolder = (folderId) => {
  const folder = Folders.findOne(folderId);
  return (folder && folder.createdBy === Meteor.userId());
}

const userOwnsOrPublicFolder = (folderId) => {
  const folder = Folders.findOne(folderId);
  return (folder && (!folder.private || folder.createdBy === Meteor.userId()));
}
