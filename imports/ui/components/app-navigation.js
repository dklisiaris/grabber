import React from 'react';
import { Link } from 'react-router';
import Gravatar from 'react-gravatar';
import { ReactPageClick } from 'react-page-click';

export class AppNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFoldersDropdownOpen: false
    };
    this._openFoldersDropdown  = this._openFoldersDropdown.bind(this);
    this._closeFoldersDropdown = this._closeFoldersDropdown.bind(this);

  }

  _closeFoldersDropdown() {
    this.setState({isFoldersDropdownOpen: false});
  }

  _openFoldersDropdown() {
    this.setState({isFoldersDropdownOpen: true});
  }

  // _getUsername() {
  //   let username = this.props.user.username;
  //   if(!username){
  //     username = this.props.user.emails[0].address;
  //     username = username.substring(0, username.indexOf('@'));
  //   }
  //   return username;
  // }

  _renderFolderItem(folder) {
    const onClick = (e) => {
      e.preventDefault();
      Meteor.setTimeout(() => { FlowRouter.go('folder', { _id: id }); }, 10);
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

    return (
      <ReactPageClick notify={this._closeFoldersDropdown}>
        <div className="dropdown">
          <header className="title"><i className="fa fa-user"/> Owned boards</header>
          <ul>
            {ownedFolders}
          </ul>
          <header className="title"><i className="fa fa-user"/> Invited boards</header>
          <ul>
            {ownedFolders}
          </ul>
          <ul className="options">
            <li>
              <a href="/folders" onClick={this._closeFoldersDropdown}>View all boards</a>
            </li>
          </ul>
        </div>
      </ReactPageClick>
    );

  }

  _renderCurrentUser() {
    return(
      <a className="current-user">
        <Gravatar className="react-gravatar" email={this.props.email} default="retro" /> {this.props.username}
      </a>
    );
  }

  render() {
    return (
      <header className="main-header">
        <nav id="boards_nav">
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
        <nav className="right">
          <ul>
            <li>
              {this._renderCurrentUser()}
            </li>
            <li>
              <a href="/logout"><i className="fa fa-sign-out"/> Sign out</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
