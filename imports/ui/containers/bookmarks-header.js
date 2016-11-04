import { composeWithTracker } from 'react-komposer';
import {BookmarksHeader} from '/imports/ui/components/bookmarks-header';
import { Meteor } from 'meteor/meteor';

const composer = ( props, onData ) => {
  const subscription = Meteor.subscribe('currentFolder', props.currentFolderId);
  if ( subscription.ready() ) {
    const folder = Folders.findOne(props.currentFolderId);
    onData( null, { folder } );
  }
};

export default composeWithTracker( composer )( BookmarksHeader );
