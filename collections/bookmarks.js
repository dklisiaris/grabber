Bookmarks = new Mongo.Collection('bookmarks');

Meteor.methods({
  addBookmark: function (url, folderId) {
    // if (! validURL(url) ) {
    //   throw new Meteor.Error("Your url is invalid");
    // }
        
    return Bookmarks.insert({
      title: url,
      url: url,            
      folderId: folderId,
      views: 0,
      createdAt: new Date()
    });  
  },  

  removeBookmark: function (bookmarkId) {
    Bookmarks.remove(bookmarkId);
  },

  updateBookmark: function (bookmarkId, data) {
    return Bookmarks.update(bookmarkId, data);
  },

  incBookmarkViews: function (bookmarkId) {
    Bookmarks.update(bookmarkId, {$inc: {views: 1}});
  },
  
  refreshBookmark: function (bookmarkId) {    
    bookmark = Bookmarks.findOne(bookmarkId);
    this.unblock();

    endpoint  = 'http://api.embed.ly/1/extract?';
    key       = 'key=debadfdc8d8446589361951747d38242';
    url       = '&url=' + bookmark.url ;
    options   = '&maxwidth=500';

    target = endpoint + key + url + options;

    HTTP.get(target, function(err,response){
      if(response.statusCode === 200){
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
  }

});