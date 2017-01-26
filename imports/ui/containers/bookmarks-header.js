import { composeWithTracker } from 'react-komposer';
import {BookmarksHeader} from '/imports/ui/components/bookmarks-header';
import {LoadingHeader} from '/imports/ui/components/loading';
import { Meteor } from 'meteor/meteor';
import Folders from '/imports/api/folders/folders';

const composer = ( props, onData ) => {
  const subscription = Meteor.subscribe('currentFolder', props.currentFolderId);
  if ( subscription.ready()) {
    const folder = Folders.findOne(props.currentFolderId);
    onData( null, { folder } );
  }
};

export default composeWithTracker( composer, LoadingHeader )( BookmarksHeader );
