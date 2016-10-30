import React from 'react';
import {BookmarksList} from '/imports/ui/components/bookmarks-list';
import {BookmarksHeader} from '/imports/ui/components/bookmarks-header';

export const BookmarksView = ({bookmarksCollection, folder}) => (
  <div className="view-container boards index">
    <section>
      <BookmarksHeader folder={folder}/>
      <BookmarksList bookmarks={bookmarksCollection} />
    </section>
  </div>
);
