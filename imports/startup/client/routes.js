import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import {App} from '/imports/ui/layouts/app';
import {Login} from '/imports/ui/views/login';
import {Signup} from '/imports/ui/views/signup';
import {ChangePassword} from '/imports/ui/views/change-password';
import {FoldersView} from '/imports/ui/views/folders';
import {BookmarksView} from '/imports/ui/views/bookmarks';
import {NotFound} from '/imports/ui/views/not-found';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
    <Redirect from="/" to="folders"/>
      <Route path="/" component={ App }>
        <Route name="login" path="/login" component={ Login } onEnter={ isUnauthenticated } />
        <Route name="signup" path="/signup" component={ Signup } onEnter={ isUnauthenticated } />
        <Route name="logout" path="/logout" onEnter={ logout } />
        <Route name="change-password" path="/password/change" component={ ChangePassword } onEnter={ authenticate } />
        <Route name="folders" path="/folders" component={ FoldersView } onEnter={ authenticate } />
        <Route name="folder" path="/folders/:id" component={ BookmarksView } onEnter={ authenticate } />
        <Route name="not-found" path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById( 'react-root' )
  );
});


const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const logout = (nextState, replace) => {
  Meteor.logout();
}

const isUnauthenticated = (nextState, replace) => {
  if (Meteor.userId()) {
    replace('/');
  }
}
