import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Bookmarks = new Mongo.Collection('bookmarks');
export default Bookmarks;

BookmarksSchema = new SimpleSchema({
  "title": {
    type: String,
    label: "Bookmark Name"
  },
  "url": {
    type: String,
    label: "Bookmark description",
  },
  "favicon": {
    type: String,
    label: "Bookmark icon",
    optional: true
  },
  "image": {
    type: String,
    label: "Bookmark icon",
    optional: true
  },
  "views": {
    type: Number,
    label: "Number of views",
    defaultValue: 0
  },
  "folderId": {
    type: String,
    label: "Parent folder"
  },
  "createdAt": {
    type: Date,
    label: "Date of creation",
    autoValue: function() {
      if ( this.isInsert ) {
        return new Date();
      }
    }
  }
});

Bookmarks.attachSchema(BookmarksSchema);
