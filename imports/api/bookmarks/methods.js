import Bookmarks from './bookmarks';
import {rateLimit} from '../../modules/rate-limit.js';

export const addBookmark = new ValidatedMethod({
  name: 'bookmarks.add',
  validate: new SimpleSchema({
    url: { type: String },
    folderId: { type: String },
  }).validator(),
  run({ url, folderId }) {
    return Bookmarks.insert({
      title: url,
      url: url,
      folderId: folderId,
      views: 0,
      createdAt: new Date()
    });
  },
});

export const removeBookmark = new ValidatedMethod({
  name: 'bookmarks.remove',
  validate: new SimpleSchema({
    bookmarkId: { type: String },
  }).validator(),
  run({ bookmarkId }) {
    Bookmarks.remove(bookmarkId);
  },
});

export const removeBookmarksInFolder = new ValidatedMethod({
  name: 'bookmarks.removeInFolder',
  validate: new SimpleSchema({
    folderId: { type: String },
  }).validator(),
  run({ folderId }) {
    Bookmarks.remove({folderId});
  },
});

export const updateBookmark = new ValidatedMethod({
  name: 'bookmarks.update',
  validate: new SimpleSchema({
    bookmarkId: { type: String },
    data: {type: Object},
    "data.title": { type: String },
    "data.url": { type: String },
    "data.image": { type: String, optional: true },
    "data.folderId": { type: String },

  }).validator(),
  run({ bookmarkId, data }) {
    return Bookmarks.update(bookmarkId, {
      $set: {
        title: data.title,
        url: data.url,
        image: data.image,
        folderId: data.folderId
      }
    });
  },
});

export const incBookmarkViews = new ValidatedMethod({
  name: 'bookmarks.incViews',
  validate: new SimpleSchema({
    bookmarkId: { type: String },
  }).validator(),
  run({ bookmarkId }) {
    Bookmarks.update(bookmarkId, {$inc: {views: 1}});
  },
});

export const refreshBookmark = new ValidatedMethod({
  name: 'bookmarks.refresh',
  validate: new SimpleSchema({
    bookmarkId: { type: String },
  }).validator(),
  run({ bookmarkId }) {
    bookmark = Bookmarks.findOne(bookmarkId);
    this.unblock();

    endpoint  = 'http://api.embed.ly/1/extract?';
    key       = 'key=debadfdc8d8446589361951747d38242';
    url       = '&url=' + bookmark.url ;
    options   = '&maxwidth=500';

    target = endpoint + key + url + options;

    HTTP.get(target, function(err,response){
      if(response && response.statusCode === 200){
        json = JSON.parse(response.content);

        Bookmarks.update(bookmarkId, {
          $set: {
            url: decodeURIComponent(json.url),
            title: json.title,
            favicon: json.favicon_url,
            image: (json.images[0] === undefined) ? null : json.images[0].url
          }
        });
      }
      else{
        console.log(response);
      }
    });
  },
});

rateLimit({
  methods: [
    addBookmark,
    removeBookmark,
    removeBookmarksInFolder,
    updateBookmark,
    incBookmarkViews,
    refreshBookmark
  ],
  limit: 5,
  timeRange: 1000,
});
