import React from 'react';
import {NewFolderBtn} from '/imports/ui/components/new-folder-btn';

export const FoldersHeader = ({iconClass, title, showNewFolderBtn}) => (
  <header className="view-header">
    <h3><i className={iconClass} /> {title}</h3>
    {showNewFolderBtn ? <NewFolderBtn/> : ''}
  </header>
);
