import React from 'react';
import {Meteor} from 'meteor/meteor';
import {ReactPageClick} from 'react-page-click';
import {addBookmark, refreshBookmark} from '../../api/bookmarks/methods';

export class NewBookmarkBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormOpen: false
    };

    this._handleAddNewClick   = this._handleAddNewClick.bind(this);
    this._handleCancelClick   = this._handleCancelClick.bind(this);
    this._handleAddNewSubmit  = this._handleAddNewSubmit.bind(this);
  }

  _handleAddNewClick(e) {
    e.preventDefault();
    this.setState({
      isFormOpen: true
    });
  }

  _handleCancelClick(e) {
    e.preventDefault()
    this.setState({
      isFormOpen: false
    });
  }

  _handleAddNewSubmit(e) {
    e.preventDefault();

    let url = this.refs.bookmarkUrl.value;
    let currentFolderId = this.props.folderId;

    addBookmark.call({url: url, folderId: currentFolderId}, (error, bookmarkId) => {
      if(error) {
        Bert.alert(error.reason, 'danger');
      }
      else {
        refreshBookmark.call({bookmarkId}, (error) => {
          if(error) Bert.alert(error.reason, 'danger');
        });
      }
    });


    this.setState({isFormOpen: false});
  }

  _renderAddBtn() {
    const tip = "Add a new bookmark.";
    return (
      <a onClick={this._handleAddNewClick} className="add-new header-btn" href="#" data-tip={tip}>
        <i className="fa fa-plus"/>
      </a>
    );
  }

  _renderNewBookmarkForm() {
    return (
      <ReactPageClick notify={this._handleCancelClick}>
        <span>
          <ul className="drop-down active">
            <li>
              <form onSubmit={this._handleAddNewSubmit}>
                <h4>Add new bookmark</h4>
                <input ref="bookmarkUrl" type="text" required={true} placeholder="Bookmark Url"/>
                <button type="submit">Add Bookmark</button> or <a onClick={this._handleCancelClick} href="#">cancel</a>
              </form>
            </li>
          </ul>
        </span>
      </ReactPageClick>
    );
  }

  render(){
    return (
      <span>
        {this.state.isFormOpen ? this._renderNewBookmarkForm() : this._renderAddBtn()}
      </span>
    );
  }
}
