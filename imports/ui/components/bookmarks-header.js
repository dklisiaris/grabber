import React from 'react';
import {ReactPageClick} from 'react-page-click';
import { browserHistory } from 'react-router';
import {NewBookmarkBtn} from './new-bookmark-btn';
import {FolderMembers} from './folder-members';
import Bookmarks from '../../api/bookmarks/bookmarks';
import {removeBookmarksInFolder} from '../../api/bookmarks/methods';
import {
  removeFolder,
  renameFolder,
  setFolderPrivacy,
  incFolderViews
} from '../../api/folders/methods';

export class BookmarksHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditingFolderName: false
    };

    this._handleFolderNameClick      = this._handleFolderNameClick.bind(this);
    this._handleCancelClick          = this._handleCancelClick.bind(this);
    this._handleFolderNameFormSubmit = this._handleFolderNameFormSubmit.bind(this);
    this._handlePrivacyBtnClick      = this._handlePrivacyBtnClick.bind(this);
    this._handleDeleteBtnClick       = this._handleDeleteBtnClick.bind(this);

    incFolderViews.call({folderId: this.props.folder._id}, null);
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

    renameFolder.call({
      folderId: this.props.folder._id,
      newName: this.refs.folderName.value
    }, null);

    this.setState({
      isEditingFolderName: false
    });
  }

  _handlePrivacyBtnClick(e) {
    e.preventDefault();

    setFolderPrivacy.call({
      folderId: this.props.folder._id,
      isPrivate: !this.props.folder.private
    }, null);
  }

  _handleDeleteBtnClick(e) {
    e.preventDefault();

    const message = "Are you sure you want to delete the folder " + this.props.folder.name + "?";
    if (confirm(message)) {
      // Remove all bookmarks in folder, then remove folder, then go to folders
      removeBookmarksInFolder.call({folderId: this.props.folder._id}, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          removeFolder.call({folderId: this.props.folder._id}, (error) => {
            if (error) {
              Bert.alert(error.reason, 'danger');
            } else {
              browserHistory.push('/folders');
            }
          });
        }
      });
    }
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

  _renderPrivacyBtn() {
    const iconClass = this.props.folder.private ? 'fa fa-lock' : 'fa fa-unlock';
    return(
      <a onClick={this._handlePrivacyBtnClick} className="add-new header-btn" href="#">
        <i className={iconClass}></i>
      </a>
    );
  }

  _renderDeleteBtn() {
    return(
      <a onClick={this._handleDeleteBtnClick} className="add-new header-btn" href="#">
        <i className="fa fa-trash"></i>
      </a>
    );
  }

  render() {
    const headerTitle = () => (
      <span>
        <h3 className="clickable" onClick={this._handleFolderNameClick} >
          {this.props.folder.name}
        </h3><NewBookmarkBtn folderId={this.props.folder._id} />
      </span>
    );
    const headerContents = () => (
      <span>
      { this.state.isEditingFolderName ? this._renderNewFolderForm() : headerTitle() }
      { !this.state.isEditingFolderName ? this._renderPrivacyBtn() : '' }
      { !this.state.isEditingFolderName ? this._renderDeleteBtn() : '' }
      </span>
    );
    return (
      <header className="view-header">
        { this.props.folder ? headerContents() : '' }
        <FolderMembers folderId={this.props.folder._id} />
      </header>
    );
  }
}
