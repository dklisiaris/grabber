import { composeWithTracker } from 'react-komposer';
import {BookmarksList} from '/imports/ui/components/bookmarks-list';
import {Loading} from '/imports/ui/components/loading';
import { Meteor } from 'meteor/meteor';
import Bookmarks from '/imports/api/bookmarks/bookmarks';
import {Images} from '/imports/api/bookmarks/bookmarks';
import {can} from '/imports/modules/permissions.js';

const composer = ( props, onData ) => {
  const subscription = can.view.folder(props.currentFolderId) ?
    Meteor.subscribe('bookmarks', props.currentFolderId) :
    Meteor.subscribe('emptyBookmarks');

  if ( subscription.ready() ) {
    const bookmarks = Bookmarks.find({}, {sort: {views: -1}}).fetch();
    const imagesSub = Meteor.subscribe('webshots', props.currentFolderId);
    if ( imagesSub.ready() ) {
      const webshots = Images.find({}).fetch();
      onData( null, { bookmarks, webshots } );
    }
  }
};

export default composeWithTracker( composer, Loading )( BookmarksList );
