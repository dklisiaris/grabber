import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { AppNavigation } from '../components/app-navigation';

const composer = (props, onData) => {
  const subscription = Meteor.subscribe( 'privateFolders' );
  if ( subscription.ready() ) {
    const folders = Folders.find().fetch();
    onData(null, {folders});
  }
};

export default composeWithTracker(composer)(AppNavigation);
