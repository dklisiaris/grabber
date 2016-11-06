import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import {FoldersList} from '/imports/ui/components/folders-list';
import {Loading} from '/imports/ui/components/loading';

const composer = ( props, onData ) => {
  const subscription = Meteor.subscribe( 'privateFolders' );
  if ( subscription.ready() ) {
    const folders = Folders.find().fetch();
    onData( null, { folders } );
  }
};

export default composeWithTracker( composer, Loading )( FoldersList );
