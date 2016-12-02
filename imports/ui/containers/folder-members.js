import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import {FolderMembers} from '/imports/ui/components/folder-members';
import {Loading} from '/imports/ui/components/loading';
import Users from '/imports/api/users/users';

const composer = ( props, onData ) => {
  const subscription = Meteor.subscribe('allUsers');
  if ( subscription.ready()) {
    const users = Users.find().fetch();
    onData( null, { members: users, folder: props.folder } );
  }
};

export default composeWithTracker( composer, Loading )( FolderMembers );
