import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Bookmarks = new Mongo.Collection('bookmarks');
export default Bookmarks;

const createThumb = (fileObj, readStream, writeStream) => {
  gm(readStream, fileObj.name()).resize('160', '128').quality(40).stream().pipe(writeStream);
};

const imageStore = new FS.Store.GridFS("images", {
  transformWrite: createThumb
});

export const Images = new FS.Collection("images", {
  stores: [imageStore]
});

Images.allow({
  download: () => {
    return true
  }
});

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
  "webshotId": {
    type: String,
    label: "Id of Webshot image",
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
