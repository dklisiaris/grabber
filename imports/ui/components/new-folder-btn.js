import React from 'react';
import {Meteor} from 'meteor/meteor';
import {ReactPageClick} from 'react-page-click';
import { browserHistory } from 'react-router';
import {addFolder} from '../../api/folders/methods';

export class NewFolderBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFormOpen: false
    };

    this._handleAddNewClick  = this._handleAddNewClick.bind(this);
    this._handleCancelClick  = this._handleCancelClick.bind(this);
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
    let folderTitle = this.refs.title.value;

    if(Meteor.userId()){
      addFolder.call({
        name: folderTitle,
        description: null,
        isPrivate: true
      }, (error) => {
        if(error){
          Bert.alert(error.reason, 'danger');
        }
      });
    } else {
      browserHistory.push('/login');
    }
    this.setState({isFormOpen: false});
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
