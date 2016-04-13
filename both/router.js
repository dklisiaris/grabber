// Router.configure({
//   // we use the  appBody template to define the layout for the entire app
//   layoutTemplate: 'appLayout',

//   // show the appLoading template whilst the subscriptions below load their data
//   loadingTemplate: 'loader',

//   // wait on the following subscriptions before rendering the page to ensure
//   // the data it's expecting is present
//   waitOn: function() {
//     return [
//       Meteor.subscribe('privateFolders'),
//       Meteor.subscribe('publicFolders'),
//       Meteor.subscribe('defaultFolders')   
//     ];
//   }  
// });

// dataReadyHold = null;

// if (Meteor.isClient) {
//   // Keep showing the launch screen on mobile devices until we have loaded
//   // the app's data
//   dataReadyHold = LaunchScreen.hold();

//   // Show the loading screen on desktop
//   Router.onBeforeAction('loading', {except: ['register', 'signin']});  
// }

// Router.map(function() {
//   this.route('appBody', {
//     path: '/folders/:_id?',

//     // subscribe to folders before the page is rendered but don't wait on the
//     // subscription, we'll just render the items as they arrive
//     onBeforeAction: function () {
//       if(this.params){
//         var folderId = this.params._id;
//       }else {
//         var folderId = Folders.findOne({})._id;
//       }
//       this.bookmarksHandle = Meteor.subscribe('bookmarks', folderId,
//         {
//          onReady:function(){
//            Session.set("bookmarksSubscriptionCompleted",true)
//          },
//          onError:function(){}
//         });

//       if (this.ready()) {
//         // Handle for launch screen defined in app-body.js        
//         dataReadyHold.release();        
//       }

//       this.next();
//     },
//     data: function () {
//       if(this.params){
//         return Folders.findOne(this.params._id);
//       } else {
//         return Folders.findOne({});
//       }
//     },
//     action: function () {
//       this.render();
//     }
//   });

//   this.route('home', {
//     path: '/',
//     action: function () {
//       Router.go('/folders');
//     }
//   });

//   this.route('/register');
//   this.route('/signin');

//   this.route('/settings');
  
// });