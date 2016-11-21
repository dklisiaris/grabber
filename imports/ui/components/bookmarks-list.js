import React from 'react';
import {Bookmark} from '/imports/ui/components/bookmark';
import AbsoluteGrid from 'react-absolute-grid';

export class BookmarksList extends React.Component{
  render(){
    return (
      <div className="bookmarks-wrapper">
        <AbsoluteGrid
          itemWidth={172}
          itemHeight={260}
          items={this.props.bookmarks}
          keyProp={'_id'}
          responsive={true}
          displayObject={(<BookmarkDisplay />)}
        />
      </div>
    );
  }
}

class BookmarkDisplay extends React.Component {
  render() {
    const { item, index, itemsLength } = this.props;
    return (
      <Bookmark
        id={item._id}
        title={item.title}
        url={item.url}
        image={item.image}
        folderId={item.folderId}
      />
    );
  }
}
