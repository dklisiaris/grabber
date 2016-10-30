import React from 'react';
import {BookmarksList} from '/imports/ui/components/bookmarks-list';
import {BookmarksHeader} from '/imports/ui/components/bookmarks-header';

export const BookmarksView = ({bookmarksCollection}) => (
  <div className="view-container boards index">
    <section>
      <BookmarksHeader iconClass="fa fa-user" title="My Bookmarks"/>
      <BookmarksList bookmarks={bookmarksCollection} />
    </section>
  </div>
);
