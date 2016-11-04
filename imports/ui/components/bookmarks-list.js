import React from 'react';
import {Bookmark} from '/imports/ui/components/bookmark';

export class BookmarksList extends React.Component{
  componentDidMount() {
    setInterval(() => this._enableGrid(), 10);
  }

  _enableGrid() {
    let wall = new freewall('#grid');
    wall.fitWidth();
  }

  render(){
    return (
      <div className="boards-wrapper">
        <div id="grid">
          {this.props.bookmarks.map((bookmark) => (
            <div className="grid-item" key={bookmark._id}>
            <Bookmark
              key={bookmark._id}
              id={bookmark._id}
              title={bookmark.title}
              url={bookmark.url}
              image={bookmark.image}
              folderId={bookmark.folderId}
            />
            </div>
          ))}
        </div>
      </div>);
  }
}
