import React from 'react';
import { Meteor } from 'meteor/meteor';
import {ReactPageClick} from 'react-page-click';
import {
  removeBookmark,
  refreshBookmark,
  updateBookmark,
  incBookmarkViews
} from '../../api/bookmarks/methods';

export class Bookmark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingActions: false,
      isModalOpen: false
    };

    this._handleActionsToggle   = this._handleActionsToggle.bind(this);
    this._handleRemoveAction    = this._handleRemoveAction.bind(this);
    this._handleBookmarkRefresh = this._handleBookmarkRefresh.bind(this);
    this._handleBookmarkEdit    = this._handleBookmarkEdit.bind(this);
    this._handleCloseModal      = this._handleCloseModal.bind(this);
    this._handleBookmarkUpdate  = this._handleBookmarkUpdate.bind(this);
    this._handeBookmarkClick    = this._handeBookmarkClick.bind(this);
  }

  componentDidMount() {

  }

  /**
  * Helpers
  */
  _shortUrl() {
    return this.props.url.replace(/.*?:\/\//g,"").replace("www.","");
  }

  _thumbnail() {
    defaultImage = "http://www.mot.be/assets/images/blocks/placeholder_image_1.png";

    return (this.props.image === undefined || this.props.image === null || this.props.image === '') ? defaultImage : this.props.image;
  }

  /**
  * Renderers
  */
  _renderBookmarkActions() {
    const bookmarkActions = (
      <ul className="bookmark-actions">
        <li>
          <a onClick={this._handeBookmarkClick} href={this.props.url} target="_blank">
            <i className="fa fa-eye"></i> View
          </a>
        </li>
        <li>
          <a href="#!" onClick={this._handleBookmarkRefresh}><i className="fa fa-refresh"></i> Refresh</a>
        </li>
        <li>
          <a href="#!" onClick={this._handleBookmarkEdit}><i className="fa fa-pencil"></i> Edit</a>
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
      <a onClick={this._handeBookmarkClick} href={this.props.url} target="_blank" className="clickable-url">
        <img src={this._thumbnail()} alt="thumbnail" width="100%"/>
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

  _renderModal() {
    if(this.state.isModalOpen){
      return(
        <div className="md-overlay">
          <div className="md-modal">
            <ReactPageClick notify={this._handleCloseModal}>
              <div className="md-content card-modal">
                <a className="close" href="#" onClick={this._handleCloseModal}>
                  <i className="fa fa-close"/>
                </a>
                <div className="info">
                  <form onSubmit={this._handleBookmarkUpdate}>
                    <h4>Edit bookmark</h4>
                    <img src={this._thumbnail()} alt="thumbnail" width="128px"/>
                    <h5>Title</h5>
                    <input ref="bookmarkTitle" type="text" required={true} defaultValue={this.props.title}/>
                    <h5>Url</h5>
                    <input ref="bookmarkUrl" type="text" required={true} defaultValue={this.props.url}/>
                    <h5>Image</h5>
                    <input ref="bookmarkImage" type="text" defaultValue={this.props.image}/>
                    <button type="submit">Update bookmark</button> or <a onClick={this._handleCloseModal} href="#">cancel</a>
                  </form>
                </div>
              </div>
            </ReactPageClick>
          </div>
        </div>
      );
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

    removeBookmark.call({bookmarkId: this.props.id}, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        let wall = new freewall('#grid');
        wall.fitWidth();
      }
    });


  }

  _handleBookmarkRefresh(e) {
    e.preventDefault();

    // Meteor.call("refreshBookmark", this.props.id);
    refreshBookmark.call({bookmarkId: this.props.id}, null);

    this.setState({isShowingActions: false});
  }

  _handleBookmarkEdit(e) {
    e.preventDefault();
    this.setState({isModalOpen: true});
  }

  _handleCloseModal(e) {
    e.preventDefault();
    this.setState({isModalOpen: false});
  }

  _handleBookmarkUpdate(e) {
    e.preventDefault();
    let data = {
      title: this.refs.bookmarkTitle.value,
      url: this.refs.bookmarkUrl.value,
      image: this.refs.bookmarkImage.value,
      folderId: this.props.folderId
    };
    // Meteor.call("updateBookmark", this.props.id, data);
    updateBookmark.call({bookmarkId: this.props.id, data: data}, (error) => {
      if(error) Bert.alert(error.reason, 'danger');
    });

    this.setState({isModalOpen: false});
  }

  _handeBookmarkClick(e) {
    incBookmarkViews.call({bookmarkId: this.props.id}, null);
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
        {this._renderModal()}
      </div>
    );
  }
}

Bookmark.propTypes = {
  id:       React.PropTypes.string,
  title:    React.PropTypes.string,
  url:      React.PropTypes.string,
  image:    React.PropTypes.string,
  folderId: React.PropTypes.string
};
