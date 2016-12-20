import React from 'react';
import {Folder} from '/imports/ui/components/folder';
import {AbsFolder} from '/imports/ui/components/folder';

import AbsoluteGrid from 'react-absolute-grid';

export class FoldersList extends React.Component {
  render() {
    return (
      <div className="folders-wrapper">
        <AbsoluteGrid
          itemWidth={218}
          itemHeight={90}
          items={this.props.folders}
          keyProp={'_id'}
          responsive={true}
          displayObject={(<FolderDisplay />)}
        />
      </div>
    );
  }
}

class FolderDisplay extends React.Component {
  render() {
    const { item, index, itemsLength} = this.props;
    return (
      <AbsFolder key={item._id} id={item._id} name={item.name} />
    );
  }
}
