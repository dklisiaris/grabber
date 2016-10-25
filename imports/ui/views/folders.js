import React from 'react';
import {FoldersList} from '/imports/ui/components/folders-list';
import {FoldersHeader} from '/imports/ui/components/folders-header';

export const FoldersView = ({foldersCollection}) => (
  <div className="view-container boards index">
    <section>
      <FoldersHeader iconClass="fa fa-user" title="My Folders"/>
      <FoldersList folders={foldersCollection} />
    </section>
  </div>
);
