import { composeWithTracker } from 'react-komposer';
import {FoldersList} from '/imports/ui/components/folders-list';
import { Meteor } from 'meteor/meteor';

const composer = ( props, onData ) => {
  const subscription = Meteor.subscribe( 'privateFolders' );
  if ( subscription.ready() ) {
    const folders = Folders.find().fetch();
    onData( null, { folders } );
  }
};

export default composeWithTracker( composer )( FoldersList );
