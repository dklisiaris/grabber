import React from 'react';
import BookmarksList from '/imports/ui/containers/bookmarks-list';
import BookmarksHeader from '/imports/ui/containers/bookmarks-header';

export class BookmarksView extends React.Component {
  render(){
    return (
      <div className="view-container">
        <section>
          <BookmarksHeader currentFolderId={this.props.params.id}/>
          <BookmarksList currentFolderId={this.props.params.id} />
        </section>
      </div>
    );
  }
}
