import { composeWithTracker } from 'react-komposer';
import {BookmarksList} from '/imports/ui/components/bookmarks-list';
import { Meteor } from 'meteor/meteor';

const composer = ( props, onData ) => {
  const subscription = Meteor.subscribe('bookmarks', props.currentFolderId);
  if ( subscription.ready() ) {
    const bookmarks = Bookmarks.find().fetch();
    onData( null, { bookmarks } );
  }
};

export default composeWithTracker( composer )( BookmarksList );
