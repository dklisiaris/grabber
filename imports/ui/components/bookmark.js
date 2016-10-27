import React from 'react';

export class Bookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing_actions: false
    };
  }

  componentDidMount() {

  }


  _shortUrl() {
    return this.props.url.replace(/.*?:\/\//g,"").replace("www.","");
  }

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
          <a href="#!" className="-text remove-bookmark"><i className="fa fa-trash"></i> Remove</a>
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
    if(this.state.showing_actions){
      return this._renderBookmarkActions();
    }
    else {
      return this._renderBookmarkThumb();
    }
  }

  _handleActionsToggle() {

  }


  render() {
    return (
      <div id={this.props.id} className="bookmark-card">
        <div className="inner">
          <h4>{this.props.title}</h4>
          {this._renderThumbOrActions()}
          <span className="bookmark-url">{this._shortUrl()}</span>
          <span className="bookmark-actions-toggle">
            <i className="fa fa-cog"></i>
          </span>
        </div>

      </div>
    );
  }
}
