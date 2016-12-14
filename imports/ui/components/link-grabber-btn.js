import React from 'react';
import {Meteor} from 'meteor/meteor';
import {ReactPageClick} from 'react-page-click';
import {
  addBookmark, refreshBookmark, grabBookmarks
} from '../../api/bookmarks/methods';

export class LinkGrabberBtn extends React.Component {
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

    let target = this.refs.targetUrl.value;
    let externalOnly = this.refs.externalOnly.checked;
    let currentFolderId = this.props.folderId;

    grabBookmarks.call({
      targetUrl: target,
      externalOnly: externalOnly,
      folderId: currentFolderId
    }, null);

    this.setState({isFormOpen: false});
  }

  _renderGrabBtn() {
    const tip = "Grab all links from url.";
    return (
      <a onClick={this._handleAddNewClick} className="link-grab header-btn" href="#" data-tip={tip}>
        <i className="fa fa-hand-grab-o"/>
      </a>
    );
  }

  _renderGrabberForm() {
    return (
      <ReactPageClick notify={this._handleCancelClick}>
        <span>
          <ul className="drop-down active">
            <li>
              <form onSubmit={this._handleAddNewSubmit}>
                <h4>Grab all links from url</h4>
                <input ref="targetUrl" type="text" required={true} placeholder="Target Url"/>
                <div className="checkbox-wrapper">
                <label>
                  <input ref="externalOnly" type="checkbox" label="External Links Only" defaultChecked/>
                    External Links Only
                </label><br/>
                </div>
                <button type="submit">Grab Bookmarks</button> or <a onClick={this._handleCancelClick} href="#">cancel</a>
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
        {this._renderGrabBtn()}
        {this.state.isFormOpen ? this._renderGrabberForm() : ''}
      </span>
    );
  }
}
