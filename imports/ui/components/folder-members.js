import React from 'react';
import { ReactPageClick } from 'react-page-click';
import { browserHistory } from 'react-router';
import Gravatar from 'react-gravatar';
import { addMemberToFolder } from '../../api/folders/methods';

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
    let currentFolderId = this.props.folder._id;

    this.setState({isFormOpen: false});

    addMemberToFolder.call({ folderId: currentFolderId, memberEmail: email }, (error) => {
      if (error) {
        Bert.alert(error, 'danger');
      } else {
        Bert.alert('User ' + email + ' has been invited to current folder.', 'success');
      }
    });
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

  _renderMemberAvatar(member){
    return (
      <li key={member._id}>
        <Gravatar className="react-gravatar" email={member.emails[0].address} title={member.emails[0].address} />
      </li>
    );
  }

  _renderMembers() {
    return this.props.members.map((member) => {
      if(_.contains(this.props.folder.invitedMembers, member._id)
        || this.props.folder.createdBy == member._id){
        return this._renderMemberAvatar(member)
      }
    });
  }

  render(){
    return(
      <ul className="board-users">
        <li>
        {this.state.isFormOpen ? this._renderForm() : this._renderAddBtn()}
        </li>
        {this._renderMembers()}
      </ul>
    );
  }
}
