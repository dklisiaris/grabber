import React from 'react';
import {Folder} from '/imports/ui/components/folder';

// let randomFolders = [];

// _(10).times((n)=>{
//   const f_name = "Folder " + n;
//   randomFolders.push(<Folder name={f_name} />);
// });

export const FoldersList = ({folders}) => (
  <div className="boards-wrapper">
    {folders.map((folder) => (
      <Folder key={folder._id} id={folder._id} name={folder.name} />
    ))}
  </div>
);
