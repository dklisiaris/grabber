const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [
    checkLoggedIn
  ]
});

authenticatedRoutes.route('/folders/:_id', {
  name: 'folder',
  action: function(params, queryParams) {
    BlazeLayout.render('default', {yield: "appBody"});
  }
});

// authenticatedRoutes.route('/test/:_id', {
//   name: 'test',
//   action: function(params, queryParams) {
//     BlazeLayout.render('onlyHeader', {yield: "folderActions"});
//   }
// });

authenticatedRoutes.route('/logout',{
  name: 'logout',
  action: function(){
    Meteor.logout();  
    Meteor.setTimeout(function(){ FlowRouter.redirect('/'); }, 10);
  }
});

function checkLoggedIn(context, redirect){
    if (!Meteor.userId()) {
      redirect('/login');
  }
}