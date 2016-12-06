import React from 'react';
import FoldersList from '/imports/ui/containers/folders';
import InvitedFoldersList from '/imports/ui/containers/invited-folders';
import {FoldersHeader} from '/imports/ui/components/folders-header';
import {Loading} from '/imports/ui/components/loading';

export const FoldersView = ({foldersCollection}) => (
  <div className="view-container boards index">
    <section>
      <FoldersHeader iconClass="fa fa-user" title="My Folders" showNewFolderBtn={true}/>
      <FoldersList />
      <FoldersHeader iconClass="fa fa-users" title="Invited to Folders" showNewFolderBtn={false}/>
      <InvitedFoldersList />
    </section>
  </div>
);
