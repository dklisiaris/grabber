import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Bookmarks = new Mongo.Collection('bookmarks');
export default Bookmarks;
