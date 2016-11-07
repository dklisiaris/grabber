import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { AppNavigation } from '../components/app-navigation';
import {Loading} from '/imports/ui/components/loading';
import Folders from '/imports/api/folders/folders';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('privateFolders', Meteor.userId());
  if ( subscription.ready() ) {
    const folders = Folders.find().fetch();
    onData(null, {folders: folders, hasUser: Meteor.user()});
  }
};

export default composeWithTracker(composer, Loading)(AppNavigation);
