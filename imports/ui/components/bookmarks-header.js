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
    this._handlePrivacyBtnClick      = this._handlePrivacyBtnClick.bind(this);
    this._handleDeleteBtnClick       = this._handleDeleteBtnClick.bind(this);
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

  _handlePrivacyBtnClick(e) {
    e.preventDefault();
    Meteor.call("setPrivacy", this.props.folder._id, !this.props.folder.private);
  }

  _handleDeleteBtnClick(e) {
    e.preventDefault();

    const message = "Are you sure you want to delete the folder " + this.props.folder.name + "?";
    if (confirm(message)) {
      // we must remove each item individually from the client
      Bookmarks.find({folderId: this.props.folder._id}).forEach(function(bookmark) {
        Meteor.call("removeBookmark", bookmark._id);
      });
      Meteor.call("removeFolder", this.props.folder._id);


      Meteor.setTimeout(function(){ FlowRouter.go('folders'); }, 10);
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
        </h3><NewBookmarkBtn/>
      </span>
    );
    const headerContents = () => (
      <span>
      { this.state.isEditingFolderName ? this._renderNewFolderForm() : headerTitle() }
      { this._renderPrivacyBtn() }
      { this._renderDeleteBtn() }
      </span>
    );
    return (
      <header className="view-header">
        { this.props.folder ? headerContents() : '' }
      </header>
    );
  }
}
