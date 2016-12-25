import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import Gravatar from 'react-gravatar';
import { ReactPageClick } from 'react-page-click';

export class AppNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFoldersDropdownOpen: false,
      isUserOptionsOpen: false
    };
    this._openFoldersDropdown  = this._openFoldersDropdown.bind(this);
    this._closeFoldersDropdown = this._closeFoldersDropdown.bind(this);
    this._openUserOptions      = this._openUserOptions.bind(this);
    this._closeUserOptions     = this._closeUserOptions.bind(this);
    this._logout = this._logout.bind(this);
  }

  _closeFoldersDropdown() {
    this.setState({isFoldersDropdownOpen: false});
  }

  _openFoldersDropdown() {
    this.setState({isFoldersDropdownOpen: true});
  }

  _closeUserOptions() {
    this.setState({isUserOptionsOpen: false});
  }

  _openUserOptions() {
    this.setState({isUserOptionsOpen: true});
  }

  _logout() {
    this._closeUserOptions();
    Meteor.logout(()=>{
      browserHistory.push('/login');
    });
  }

  _getEmail() {
    if(this.props.hasUser){
      return Meteor.user().emails[0].address;
    }
  }

  _getUsername() {
    if(this.props.hasUser){
      let username = Meteor.user().username;
      const email = Meteor.user().emails[0].address;
      if(!username){
        username = email.substring(0, email.indexOf('@'));
      }
      return username;
    }
  }

  _renderFolderItem(folder) {
    const onClick = (e) => {
      e.preventDefault();
      this._closeFoldersDropdown();
      browserHistory.push('/folders' + '/' + folder._id);
    };

    return (
      <li key={folder._id}>
        <a href="#" onClick={onClick}>{folder.name}</a>
      </li>
    );

  }

  _renderFolders(){
    if (!this.state.isFoldersDropdownOpen) return false;

    const ownedFolders = this.props.folders.map((folder) => {
      return this._renderFolderItem(folder);
    });

    const invitedFolders = this.props.invitedFolders.map((folder) => {
      return this._renderFolderItem(folder);
    });

    return (
      <ReactPageClick notify={this._closeFoldersDropdown}>
        <div className="dropdown">
          <header className="title"><i className="fa fa-user"/> Owned folders</header>
          <ul>
            {ownedFolders}
          </ul>
          <header className="title"><i className="fa fa-user"/> Invited folders</header>
          <ul>
            {invitedFolders}
          </ul>
          <ul className="options">
            <li>
              <Link to="/folders" onClick={this._closeFoldersDropdown}>View all folders</Link>
            </li>
          </ul>
        </div>
      </ReactPageClick>
    );

  }

  _renderCurrentUser() {
    return(
      <a className="current-user" onClick={this._openUserOptions}>
        <Gravatar className="react-gravatar" email={this._getEmail()} default="retro" /> {this._getUsername()}
      </a>
    );
  }

  _renderUserOptions() {
    if (!this.state.isUserOptionsOpen) return false;
    return (
      <ReactPageClick notify={this._closeUserOptions}>
        <div className="dropdown">
          <header className="title"><i className="fa fa-cog"/> Options</header>
          <ul>
            <li>
              <Link onClick={this._closeUserOptions} to="/password/change">Change Password</Link>
            </li>
            <li>
              <Link onClick={this._logout}>Sign Out</Link>
            </li>
          </ul>
        </div>
      </ReactPageClick>
    );
  }

  render() {
    if(this.props.hasUser){
      return (
        <header className="main-header">
          <nav id="folders_nav">
            <ul>
              <li>
                <a onClick={this._openFoldersDropdown}><i className="fa fa-folder-o"/> Folders</a>
                {this._renderFolders()}
              </li>
            </ul>
          </nav>
          <Link to='/'>
            <span className='logo'/>
          </Link>
          <nav className="right nav-buttons">
            <ul>
              <li>
                {this._renderCurrentUser()}
                {this._renderUserOptions()}
              </li>
            </ul>
          </nav>
        </header>
      );
    }
    else{
      return false;
    }
  }
}
