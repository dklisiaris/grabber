import React from 'react';
import {Meteor} from 'meteor/meteor';
import {ReactPageClick} from 'react-page-click';

export class NewFolderBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormOpen: false
    };

    this._handleAddNewClick    = this._handleAddNewClick.bind(this);
    this._handleCancelClick     = this._handleCancelClick.bind(this);
    this._handleAddNewSubmit = this._handleAddNewSubmit.bind(this);
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

    if(Meteor.userId()){
      Meteor.call("addFolder", Folders.defaultName(), null, true, function(err, folderId) {
        Meteor.setTimeout(function(){ FlowRouter.go('/folders/' + folderId); }, 10);
      });
    } else {
      Meteor.setTimeout(function(){ FlowRouter.go('/signin'); }, 10);
    }
  }

  _renderAddBtn() {
    return (
      <a onClick={this._handleAddNewClick} className="add-new header-btn" href="#"><i className="fa fa-plus"/></a>
    );
  }

  _renderNewFolderForm() {
    return (
      <ReactPageClick notify={this._handleCancelClick}>
        <span>
          <ul className="drop-down active">
            <li>
              <form onSubmit={this._handleAddNewSubmit}>
                <h4>Add new folder</h4>
                <input ref="title" type="text" required={true} placeholder="Folder name"/>
                <button type="submit">Add folder</button> or <a onClick={this._handleCancelClick} href="#">cancel</a>
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
        {this.state.isFormOpen ? this._renderNewFolderForm() : this._renderAddBtn()}
      </span>
    );
  }
}
