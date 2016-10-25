import React from 'react';
import {Meteor} from 'meteor/meteor';

const _createNewFolder = () => {
  if(Meteor.userId()){
    Meteor.call("addFolder", Folders.defaultName(), null, true, function(err, folderId) {
      Meteor.setTimeout(function(){ FlowRouter.go('/folders/' + folderId); }, 10);
    });
  } else {
    Meteor.setTimeout(function(){ FlowRouter.go('/signin'); }, 10);
  }
}

export const NewFolderBtn = () => (
  <a onClick={_createNewFolder} className="add-new header-btn" href="#"><i className="fa fa-plus"/></a>
);
