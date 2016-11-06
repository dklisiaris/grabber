import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import {App} from '/imports/ui/layouts/app';
import {Login} from '/imports/ui/views/login';
import {Signup} from '/imports/ui/views/signup';
import {FoldersView} from '/imports/ui/views/folders';
import {BookmarksView} from '/imports/ui/views/bookmarks';
import {NotFound} from '/imports/ui/views/not-found';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
    <Redirect from="/" to="folders"/>
      <Route path="/" component={ App }>
        <Route name="login" path="/login" component={ Login } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route name="folders" path="/folders" component={ FoldersView } onEnter={ authenticate } />
        <Route name="folder" path="/folders/:id" component={ BookmarksView } onEnter={ authenticate } />
        <Route name="not-found" path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById( 'react-root' )
  );
});
