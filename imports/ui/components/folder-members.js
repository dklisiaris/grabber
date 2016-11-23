import React from 'react';
import {ReactPageClick} from 'react-page-click';
import { browserHistory } from 'react-router';
import Gravatar from 'react-gravatar';

export class FolderMembers extends React.Component {
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

    let email = this.refs.memberEmail.value;
    let currentFolderId = this.props.folderId;

    console.log(email);
    console.log(currentFolderId);

    this.setState({isFormOpen: false});
  }

  _renderUsers(){

  }

  _renderAddBtn() {
    return (
      <a onClick={this._handleAddNewClick} className="header-btn" href="#">
        <i className="fa fa-plus"></i>
      </a>
    );
  }

  _renderForm(){
    return (
      <ReactPageClick notify={this._handleCancelClick}>
        <span>
          <ul className="drop-down active">
            <li>
              <form onSubmit={this._handleAddNewSubmit}>
                <h4>Invite Members</h4>
                <input ref="memberEmail" type="email" required={true} placeholder="Member Email"/>
                <button type="submit">Add Member</button> or <a onClick={this._handleCancelClick} href="#">Cancel</a>
              </form>
            </li>
          </ul>
        </span>
      </ReactPageClick>
    );
  }

  render(){
    return(
      <ul className="board-users">
        <li>
        {this.state.isFormOpen ? this._renderForm() : this._renderAddBtn()}
        </li>
        <li >
          <Gravatar className="react-gravatar" email="dklisiaris@hotmail.com"/>
        </li>
        <li >
          <Gravatar className="react-gravatar" email="dklisiaris@gmail.com"/>
        </li>
        <li >
          <Gravatar className="react-gravatar" email="dklisiaris@hotmail.com"/>
        </li>
        <li >
          <Gravatar className="react-gravatar" email="dklisiaris@gmail.com"/>
        </li>
      </ul>
    );
  }
}
