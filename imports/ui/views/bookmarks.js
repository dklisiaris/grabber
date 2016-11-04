import React from 'react';
import BookmarksList from '/imports/ui/containers/bookmarks-list';
import BookmarksHeader from '/imports/ui/containers/bookmarks-header';

export const BookmarksView = ({params}) => (
  <div className="view-container boards index">
    <section>
      <BookmarksHeader currentFolderId={params.id}/>
      <BookmarksList currentFolderId={params.id} />
    </section>
  </div>
);
