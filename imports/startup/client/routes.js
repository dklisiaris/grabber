import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

import {App} from '/imports/ui/layouts/app';
import {Login} from '/imports/ui/views/login';
import {Signup} from '/imports/ui/views/signup';
import {FoldersView} from '/imports/ui/views/folders';
import {BookmarksView} from '/imports/ui/views/bookmarks';

Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <Route name="login" path="/login" component={ Login } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route name="folders" path="/folders" component={ FoldersView } />
        <Route name="folder" path="/folders/:id" component={ BookmarksView } />
      </Route>
    </Router>,
    document.getElementById( 'react-root' )
  );
});
