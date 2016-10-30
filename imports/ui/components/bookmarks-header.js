import React from 'react';
import {NewBookmarkBtn} from '/imports/ui/components/new-bookmark-btn';
import {ReactPageClick} from 'react-page-click';

export class BookmarksHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingFolderName: false
    };

    this._handleFolderNameClick      = this._handleFolderNameClick.bind(this);
    this._handleCancelClick          = this._handleCancelClick.bind(this);
    this._handleFolderNameFormSubmit = this._handleFolderNameFormSubmit.bind(this);
  }

  _handleFolderNameClick(e) {
    e.preventDefault();
    this.setState({
      isEditingFolderName: true
    });
  }

  _handleCancelClick(e) {
    e.preventDefault()
    this.setState({
      isEditingFolderName: false
    });
  }

  _handleFolderNameFormSubmit(e) {
    e.preventDefault();

    Meteor.call("renameFolder", this.props.folder._id, this.refs.folderName.value);

    this.setState({
      isEditingFolderName: false
    });
  }

  _renderNewFolderForm() {
    return (
      <ReactPageClick notify={this._handleCancelClick}>
        <span>
          <ul className="drop-down active">
            <li>
              <form onSubmit={this._handleFolderNameFormSubmit}>
                <h4>Edit Folder Name</h4>
                <input ref="folderName" type="text" required={true} defaultValue={this.props.folder.name} />
                <button type="submit">Rename Folder</button> or <a onClick={this._handleCancelClick} href="#">cancel</a>
              </form>
            </li>
          </ul>
        </span>
      </ReactPageClick>
    );
  }

  render() {
    const headerTitle = () => (
      <span>
        <h3 className="clickable" onClick={this._handleFolderNameClick} >
          {this.props.folder.name}
        </h3><NewBookmarkBtn/>
      </span>
    );
    return (
      <header className="view-header">
        { this.state.isEditingFolderName ? this._renderNewFolderForm() : headerTitle() }
      </header>
    );
  }
}
