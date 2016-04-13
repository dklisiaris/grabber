const publicRoutes = FlowRouter.group({
  name: 'public'
});

publicRoutes.route('/login', {
  name: 'login',
  action: function(params, queryParams) {
    BlazeLayout.render('onlyHeader', {yield: "login"});
  }
});

publicRoutes.route('/signup', {
  name: 'signup',
  action: function(params, queryParams) {
    BlazeLayout.render('onlyHeader', {yield: "signup"});
  }
});

publicRoutes.route('/', {
  name: 'home',
  action: function(params, queryParams) {
    BlazeLayout.render('default', {yield: "appBody"});
  }
});