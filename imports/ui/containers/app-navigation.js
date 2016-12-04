import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import { AppNavigation } from '../components/app-navigation';
import {Loading} from '/imports/ui/components/loading';
import Folders from '/imports/api/folders/folders';

const composer = (props, onData) => {
  const userId = Meteor.userId();
  const subscription1 = Meteor.subscribe('userData', userId);

  if (subscription1.ready()) {
    const invitedFoldersIds =  Meteor.user().profile.invitedFolders;
    const subscription2 = Meteor.subscribe('accessedFolders', userId, invitedFoldersIds);

    if(subscription2.ready()){
      const folders = Folders.find({createdBy: userId}).fetch();
      const invitedFolders = Folders.find({"_id": {$in: invitedFoldersIds}}).fetch();

      onData(null, {folders: folders, invitedFolders: invitedFolders, hasUser: Meteor.user()});
    }
  }
};

export default composeWithTracker(composer, Loading)(AppNavigation);
