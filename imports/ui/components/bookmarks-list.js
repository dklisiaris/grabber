import React from 'react';
import {Bookmark} from '/imports/ui/components/bookmark';
import {updateBookmark} from '../../api/bookmarks/methods';
import AbsoluteGrid from 'react-absolute-grid';
import {ReactPageClick} from 'react-page-click';
import {can} from '/imports/modules/permissions.js';

export class BookmarksList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedBookmarkId: null
    };

    this._openEditBookmarkModal = this._openEditBookmarkModal.bind(this);
    this._closeEditBookmarkModal = this._closeEditBookmarkModal.bind(this);
    this._handleBookmarkUpdate = this._handleBookmarkUpdate.bind(this);
  }

  _openEditBookmarkModal(bookmarkId) {
    this.setState({
      isModalOpen: true,
      selectedBookmarkId: bookmarkId
    });
  }

  _closeEditBookmarkModal() {
    this.setState({isModalOpen: false, selectedBookmarkId: null});
  }

  _thumbnail(selectedBookmark) {
    defaultImage = "http://www.mot.be/assets/images/blocks/placeholder_image_1.png";

    return (!selectedBookmark.image) ? defaultImage : selectedBookmark.image;
  }

  _getBookmarkById(bookmarkId) {
    let selectedBookmark = null;
    _.each(this.props.bookmarks, (bookmark) => {
      if(bookmark._id === bookmarkId){
        selectedBookmark = bookmark;
      }
    });
    return selectedBookmark;
  }

  _handleBookmarkUpdate(e) {
    e.preventDefault();
    let data = {
      title: this.refs.bookmarkTitle.value,
      url: this.refs.bookmarkUrl.value,
      image: this.refs.bookmarkImage.value,
      folderId: this.props.currentFolderId
    };
    // Meteor.call("updateBookmark", this.props.id, data);
    updateBookmark.call({bookmarkId: this.state.selectedBookmarkId, data: data}, (error) => {
      if(error) Bert.alert(error.reason, 'danger');
    });

    this.setState({isModalOpen: false, selectedBookmarkId: null});
  }

  _renderModal() {
    if(this.state.isModalOpen){
      const selectedBookmark = this._getBookmarkById(this.state.selectedBookmarkId);

      return(
        <div className="md-overlay">
          <div className="md-modal">
            <ReactPageClick notify={this._closeEditBookmarkModal}>
              <div className="md-content card-modal">
                <a className="close" href="#" onClick={this._closeEditBookmarkModal}>
                  <i className="fa fa-close"/>
                </a>
                <div className="info">
                  <form onSubmit={this._handleBookmarkUpdate}>
                    <h4>Edit bookmark</h4>
                    <img src={this._thumbnail(selectedBookmark)} alt="thumbnail" width="128px"/>
                    <h5>Title</h5>
                    <input ref="bookmarkTitle" type="text" required={true} defaultValue={selectedBookmark.title}/>
                    <h5>Url</h5>
                    <input ref="bookmarkUrl" type="text" required={true} defaultValue={selectedBookmark.url}/>
                    <h5>Image</h5>
                    <input ref="bookmarkImage" type="text" defaultValue={selectedBookmark.image}/>
                    <button type="submit">Update bookmark</button> or <a onClick={this._closeEditBookmarkModal} href="#">cancel</a>
                  </form>
                </div>
              </div>
            </ReactPageClick>
          </div>
        </div>
      );
    }
  }

  render(){
    return (
      <div className="bookmarks-wrapper" id="bookmarks-wrapper">
        <AbsoluteGrid
          itemWidth={172}
          itemHeight={230}
          items={this.props.bookmarks}
          keyProp={'_id'}
          responsive={true}
          displayObject={(<BookmarkDisplay
            editBookmarkHandler={this._openEditBookmarkModal}
            readOnly={!can.edit.bookmarks(this.props.currentFolderId)}
            webshots={this.props.webshots} />)}
        />
        {this._renderModal()}
      </div>
    );
  }
}

class BookmarkDisplay extends React.Component {
  render() {
    const { item, index, itemsLength, editBookmarkHandler, readOnly, webshots } = this.props;
    const webshot = _.find(webshots, (ws) => { return ws._id == item.webshotId });
    const webshotUrl = webshot ? webshot.url({store: "images", auth: false}) : null;

    return (
      <Bookmark
        id={item._id}
        title={item.title}
        url={item.url}
        image={item.image}
        folderId={item.folderId}
        webshotUrl={webshotUrl}
        editBookmarkHandler={editBookmarkHandler}
        readOnly={readOnly}
      />
    );
  }
}
