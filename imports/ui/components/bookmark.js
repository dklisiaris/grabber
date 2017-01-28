import React from 'react';
import { Meteor } from 'meteor/meteor';
import {ReactPageClick} from 'react-page-click';
import {
  removeBookmark,
  refreshBookmark,
  updateBookmark,
  incBookmarkViews
} from '../../api/bookmarks/methods';
import {can} from '/imports/modules/permissions.js';
import {Loading} from '/imports/ui/components/loading';
import ReactTooltip from 'react-tooltip';

export class Bookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingActions: false,
      isModalOpen: false,
      isLoading: false
    };

    this._handleActionsToggle   = this._handleActionsToggle.bind(this);
    this._handleRemoveAction    = this._handleRemoveAction.bind(this);
    this._handleBookmarkRefresh = this._handleBookmarkRefresh.bind(this);
    this._handleBookmarkEdit    = this._handleBookmarkEdit.bind(this);
    this._handeBookmarkClick    = this._handeBookmarkClick.bind(this);
  }

  /**
  * Helpers
  */
  _shortUrl() {
    return this.props.url.replace(/.*?:\/\//g,"").replace("www.","");
  }

  _thumbnail() {
    let thumbSrc = '/img/no-image.png';

    if(this.props.webshotUrl){
      thumbSrc = this.props.webshotUrl
    }
    else if (this.props.image){
      thumbSrc = this.props.image
    }
    return <img src={thumbSrc} alt="thumbnail" width="100%" />
  }

  /**
  * Renderers
  */
  _renderBookmarkActions() {
    const bookmarkActions = (
      <ul className="bookmark-actions">
        <li>
          <a onClick={this._handeBookmarkClick} href={this.props.url} target="_blank">
            <i className="fa fa-eye"></i>
            <span className="bookmark-action-text"> View</span>
          </a>
        </li>
        <li>
          <a onClick={this._handleBookmarkRefresh}><i className="fa fa-refresh"></i>
            <span className="bookmark-action-text"> Refresh</span>
          </a>
        </li>
        <li>
          <a onClick={this._handleBookmarkEdit}><i className="fa fa-pencil"></i>
            <span className="bookmark-action-text"> Edit</span>
          </a>
        </li>
        <li>
          <a onClick={this._handleRemoveAction} ><i className="fa fa-trash"></i>
            <span className="bookmark-action-text"> Remove</span>
          </a>
        </li>
      </ul>
    );
    return bookmarkActions;
  }

  _renderBookmarkThumb() {
    const bookmarkThumb = (
      <a onClick={this._handeBookmarkClick} href={this.props.url} target="_blank" className="clickable-url">
        {this._thumbnail()}
      </a>
    );
    return bookmarkThumb;
  }

  _renderThumbOrActions() {
    if(this.state.isShowingActions && !this.props.readOnly){
      return this._renderBookmarkActions();
    }
    else {
      return this._renderBookmarkThumb();
    }
  }

  _renderActionsToggleBtn() {
    const actionsToggleBtn = (
      <span className="bookmark-actions-toggle" onClick={this._handleActionsToggle}>
        <i className={this.state.isShowingActions ? 'fa fa-undo' : 'fa fa-cog'}></i>
      </span>
    )
    if(!this.props.readOnly){
      return actionsToggleBtn;
    }
  }

  _renderBookmarkInner() {
    const innerContent = (
      <div className="inner">
        <h4 data-tip={this.props.title} data-for={this.props.id}>
          <a href={this.props.url} target="_blank">{this.props.title}</a>
        </h4>
        <div className="bookmark-content">
        {this._renderThumbOrActions()}
        </div>
        <div className="bookmark-footer">
          <div className="bookmark-url-wrapper">
            <span className="bookmark-url">{this._shortUrl()}</span>
          </div>
          {this._renderActionsToggleBtn()}
        </div>
      </div>
    );
    const innerLoading = (
      <div className="inner">
        <Loading/>
      </div>
    )

    return !this.state.isLoading ? innerContent : innerLoading;
  }

  /**
  * Handlers
  */
  _handleActionsToggle(e) {
    e.preventDefault();

    this.setState(prevState => ({
      isShowingActions: !prevState.isShowingActions
    }));
  }

  _handleRemoveAction(e) {
    e.preventDefault();

    removeBookmark.call({bookmarkId: this.props.id}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      }
    });
  }

  _handleBookmarkRefresh(e) {
    e.preventDefault();

    this.setState({isLoading: true, isShowingActions: false});

    refreshBookmark.call({bookmarkId: this.props.id}, (err) => {
      this.setState({isLoading: false})
    });


  }

  _handleBookmarkEdit(e) {
    e.preventDefault();
    this.props.editBookmarkHandler(this.props.id);
  }

  _handeBookmarkClick(e) {
    incBookmarkViews.call({bookmarkId: this.props.id}, null);
  }

  render() {
    return (
      <div id={this.props.id} className="bookmark-card">
        {this._renderBookmarkInner()}
        <ReactTooltip id={this.props.id} place="top" multiline={true} effect="solid" />
      </div>
    );
  }
}

Bookmark.propTypes = {
  id:       React.PropTypes.string,
  title:    React.PropTypes.string,
  url:      React.PropTypes.string,
  image:    React.PropTypes.string,
  folderId: React.PropTypes.string,
  webshotUrl:  React.PropTypes.string,
  editBookmarkHandler: React.PropTypes.func,
  readOnly: React.PropTypes.bool,
};
