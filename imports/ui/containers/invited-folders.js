import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import {FoldersList} from '/imports/ui/components/folders-list';
import {Loading} from '/imports/ui/components/loading';
import Folders from '/imports/api/folders/folders';

const composer = ( props, onData ) => {
  const subscription = Meteor.subscribe('invitedFolders', Meteor.userId());
  if ( subscription.ready() ) {
    const folders = Folders.find({
      isDefault: false, createdBy: {$ne: Meteor.userId()}
    }).fetch();
    onData( null, { folders } );
  }
};

export default composeWithTracker( composer, Loading )( FoldersList );
