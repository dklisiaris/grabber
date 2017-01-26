import React from 'react';
import {Folder} from '/imports/ui/components/folder';
import {AbsFolder} from '/imports/ui/components/folder';

import AbsoluteGrid from 'react-absolute-grid';

export class FoldersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { folderWidth: 218 };
    this._updateFolderWidth = this._updateFolderWidth.bind(this);
  }
  componentWillMount() {
      this._updateFolderWidth();
  }
  componentDidMount() {
      window.addEventListener("resize", this._updateFolderWidth);
  }
  componentWillUnmount() {
      window.removeEventListener("resize", this._updateFolderWidth);
  }

  _updateFolderWidth(){
    const windowWidth = $(window).width();
    let folderWidth = 218;
    if (windowWidth < 768 && windowWidth > 320 ) {
      folderWidth = 150;
    }
    else if (windowWidth <= 320) {
      folderWidth = 135;
    }
    this.setState({ folderWidth });
  }

  render() {
    return (
      <div className="folders-wrapper">
        <AbsoluteGrid
          itemWidth={this.state.folderWidth}
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
