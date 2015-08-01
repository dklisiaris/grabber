Router.configure({
  // we use the  appBody template to define the layout for the entire app
  layoutTemplate: 'appLayout',

  // show the appLoading template whilst the subscriptions below load their data
  loadingTemplate: 'loader',

  // wait on the following subscriptions before rendering the page to ensure
  // the data it's expecting is present
  waitOn: function() {
    return [
      Meteor.subscribe('privateFolders'),
      Meteor.subscribe('publicFolders')   
    ];
  }  
});

dataReadyHold = null;

if (Meteor.isClient) {
  // Keep showing the launch screen on mobile devices until we have loaded
  // the app's data
  dataReadyHold = LaunchScreen.hold();

  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['register', 'signin']});  
}

Router.map(function() {
  this.route('appBody', {
    path: '/folders/:_id',

    // subscribe to todos before the page is rendered but don't wait on the
    // subscription, we'll just render the items as they arrive
    onBeforeAction: function () {
      this.bookmarksHandle = Meteor.subscribe('bookmarks', this.params._id,
        {
         onReady:function(){
           Session.set("bookmarksSubscriptionCompleted",true)
         },
         onError:function(){}
        });

      if (this.ready()) {
        // Handle for launch screen defined in app-body.js        
        dataReadyHold.release();        
      }

      this.next();
    },
    data: function () {
      return Folders.findOne(this.params._id);
    },
    action: function () {
      this.render();
    }
  });

  this.route('home', {
    path: '/',
    action: function() {
      Router.go('appBody', Folders.findOne({private: false}));
    }
  });

  this.route('/register');
  this.route('/signin');
  
});