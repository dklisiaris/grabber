import React from 'react';
import { Meteor } from 'meteor/meteor';

export class Bookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingActions: false
    };

    this._handleActionsToggle = this._handleActionsToggle.bind(this);
    this._handleRemoveAction = this._handleRemoveAction.bind(this);
  }

  componentDidMount() {

  }

  /**
  * Helpers
  */
  _shortUrl() {
    return this.props.url.replace(/.*?:\/\//g,"").replace("www.","");
  }

  /**
  * Renderers
  */
  _renderBookmarkActions() {
    const bookmarkActions = (
      <ul className="bookmark-actions">
        <li>
          <a href="#!" target="_blank" className="-text clickable-url"><i className="fa fa-eye"></i> View</a>
        </li>
        <li>
          <a href="#!" className="-text refresh-bookmark"><i className="fa fa-refresh"></i> Refresh</a>
        </li>
        <li>
          <a href="#!" data-activates="chat-out" className="-text edit-bookmark"><i className="fa fa-pencil"></i> Edit</a>
        </li>
        <li>
          <a href="#!" onClick={this._handleRemoveAction} ><i className="fa fa-trash"></i> Remove</a>
        </li>
      </ul>
    );
    return bookmarkActions;
  }

  _renderBookmarkThumb() {
    const bookmarkThumb = (
      <a href={this.props.url} target="_blank" className="clickable-url">
        <img src={this.props.thumbnail} alt="thumbnail" width="100%"/>
      </a>
    );
    return bookmarkThumb;
  }

  _renderThumbOrActions() {
    if(this.state.isShowingActions){
      return this._renderBookmarkActions();
    }
    else {
      return this._renderBookmarkThumb();
    }
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

    Meteor.call("removeBookmark", this.props.id);

    let wall = new freewall('#grid');
    wall.fitWidth();
  }


  render() {
    return (
      <div id={this.props.id} className="bookmark-card">
        <div className="inner">
          <h4>{this.props.title}</h4>
          <div className="bookmark-content">
          {this._renderThumbOrActions()}
          </div>
          <div className="bookmark-footer">
            <div className="bookmark-url-wrapper">
              <span className="bookmark-url">{this._shortUrl()}</span>
            </div>
            <span className="bookmark-actions-toggle" onClick={this._handleActionsToggle}>
              <i className={this.state.isShowingActions ? 'fa fa-undo' : 'fa fa-cog'}></i>
            </span>
          </div>
        </div>

      </div>
    );
  }
}
