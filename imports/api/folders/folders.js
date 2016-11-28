import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Folders = new Mongo.Collection('folders');
export default Folders;

FoldersSchema = new SimpleSchema({
  "name": {
    type: String,
    label: "Folder Name"
  },
  "description": {
    type: String,
    label: "Folder description",
    optional: true
  },
  "private": {
    type: Boolean,
    label: "Is private?",
    defaultValue: true
  },
  "isDefault": {
    type: Boolean,
    label: "Is default?",
    defaultValue: false
  },
  "icon": {
    type: String,
    label: "Folder icon",
    optional: true
  },
  "views": {
    type: Number,
    label: "Number of views",
    defaultValue: 0
  },
  "createdBy": {
    type: String,
    label: "Creator of Folder"
  },
  "invitedMembers": {
    type: [String],
    optional: true
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

Folders.attachSchema(FoldersSchema);

// Calculate a default name for a folder in the form of 'Folder A'
Folders.defaultName = function() {
  let nextLetter = '1', nextName = 'New Folder ' + nextLetter;
  while (Folders.findOne({name: nextName})) {
    // not going to be too smart here, can go past Z
    nextLetter = parseInt(_.last(nextName.split(' '))) + 1;
    nextName = 'New Folder ' + nextLetter;
  }

  return nextName;
};
