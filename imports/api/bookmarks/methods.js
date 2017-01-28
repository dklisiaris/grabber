import Bookmarks from './bookmarks';
import {Images} from './bookmarks';
import {rateLimit} from '../../modules/rate-limit.js';
import {can} from '../../modules/permissions.js';
import cheerio from 'cheerio';
import {default as urlParser} from 'url';

export const addBookmark = new ValidatedMethod({
  name: 'bookmarks.add',
  validate: new SimpleSchema({
    url: { type: String },
    folderId: { type: String },
  }).validator(),
  run({ url, folderId }) {
    if(can.create.bookmark(folderId)){
      // if(!urlParser.parse(url).hostname){
      //   throw new Meteor.Error("url-invalid", "The url is not valid");
      // }
      if(!Bookmarks.findOne({
        folderId: folderId,
        url: {$regex: "(https?:\/\/(www.)?)?" + url + "\/?$"}
      })){
        return Bookmarks.insert({
          title: url,
          url: url,
          folderId: folderId,
          views: 0,
          createdAt: new Date()
        });
      }
      else{
        throw new Meteor.Error("url-found", "Url already saved in folder");
      }
    }
  },
});

export const addAndRefreshBookmark = new ValidatedMethod({
  name: 'bookmarks.addAndRefresh',
  validate: new SimpleSchema({
    url: { type: String },
    folderId: { type: String },
  }).validator(),
  run({ url, folderId }) {
    addBookmark.call({url, folderId}, (error, bookmarkId) => {
      if(!error && bookmarkId) {
        refreshBookmark.call({bookmarkId}, (error) => {
          if(error) console.log(error);
        });
      }
      else {
        console.log(error);
      }
    });
  },
});



export const removeBookmark = new ValidatedMethod({
  name: 'bookmarks.remove',
  validate: new SimpleSchema({
    bookmarkId: { type: String },
  }).validator(),
  run({ bookmarkId }) {
    if(can.delete.bookmark(bookmarkId)){
      Images.remove({bookmarkId})
      Bookmarks.remove(bookmarkId);
    }
  },
});

export const removeBookmarksInFolder = new ValidatedMethod({
  name: 'bookmarks.removeInFolder',
  validate: new SimpleSchema({
    folderId: { type: String },
  }).validator(),
  run({ folderId }) {
    if(can.delete.folder(folderId)){
      Images.remove({folderId});
      Bookmarks.remove({folderId});
    }
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
    if(can.edit.bookmark(bookmarkId)){
      return Bookmarks.update(bookmarkId, {
        $set: {
          title: data.title,
          url: data.url,
          image: data.image,
          folderId: data.folderId
        }
      });
    }
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
    const bookmark = Bookmarks.findOne(bookmarkId);
    this.unblock();

    if(Meteor.isServer){
      const endpoint  = 'http://api.embed.ly/1/extract?';
      const key       = 'key=debadfdc8d8446589361951747d38242';
      const url       = '&url=' + bookmark.url ;
      const options   = '&maxwidth=500';

      const target = endpoint + key + url + options;

      HTTP.get(target, function(err,response){
        if(response && response.statusCode === 200){
          const json = JSON.parse(response.content);

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
          if(response && response.statusCode === 400){
            Bookmarks.remove(bookmarkId);
          }
        }
      });

      const webshot = require('webshot');
      const im = require('imagemagick');

      const opts = {
        phantomPath: require('phantomjs-prebuilt').path,
        quality: 40,
        streamType: 'jpg',
        screenSize: {
          width: 1024,
          height: 800
        },
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko)'
          + ' Ubuntu Chromium/55.0.2883.87 Chrome/55.0.2883.87 Safari/537.36'

      }

      webshot(bookmark.url, opts, function(err, renderStream) {
        if(err){
          console.log('Webshot failed');
          console.log(err);
          return err;
        }

        let imageBuffers = [];

        renderStream.on('data', Meteor.bindEnvironment(function (data) {
          imageBuffers.push(data);
        }));

        renderStream.on('end', Meteor.bindEnvironment(function () {
          let imageBuffer = Buffer.concat(imageBuffers);
          let imageFile = new FS.File();
          imageFile.attachData(imageBuffer, {type: 'image/jpg'});
          imageFile.folderId = bookmark.folderId;
          imageFile.bookmarkId = bookmarkId;
          Images.insert(imageFile, Meteor.bindEnvironment(function (err, result) {
            console.log(result);
            Bookmarks.update(bookmarkId, {
              $set: {webshotId: result._id}
            });
          }));
        }));
      });
    }
  },
});

export const grabBookmarks = new ValidatedMethod({
  name: 'bookmarks.grab',
  validate: new SimpleSchema({
    targetUrl: { type: String },
    externalOnly: { type: Boolean },
    folderId: { type: String },
  }).validator(),
  run({ targetUrl, externalOnly, folderId }) {
    this.unblock();

    if(Meteor.isServer){
      const hostname = urlParser.parse(targetUrl).hostname

      HTTP.get(targetUrl, function(err,response){
        if(response && response.statusCode === 200){
          $ = cheerio.load(response.content);
          $('body').find('a').each((i, elem) => {
            const link = $(elem).attr('href');
            if(externalOnly && !link.includes(hostname)){
              if(urlParser.parse(link).hostname != null){
                addAndRefreshBookmark.call({
                  url: link,
                  folderId: folderId
                }, null);
              }
            }
            else if(!externalOnly){
              if(urlParser.parse(link).hostname != null){
                addAndRefreshBookmark.call({
                  url: link,
                  folderId: folderId
                }, null);
              }
            }
          });
        }
        else{
          console.log(response);
        }
      });
    }
  },
});



rateLimit({
  methods: [
    addBookmark,
    addAndRefreshBookmark,
    removeBookmark,
    removeBookmarksInFolder,
    updateBookmark,
    incBookmarkViews,
    refreshBookmark,
    grabBookmarks
  ],
  limit: 5,
  timeRange: 1000,
});
