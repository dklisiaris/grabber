import React from 'react';
import {NewBookmarkBtn} from '/imports/ui/components/new-bookmark-btn';

export const BookmarksHeader = ({iconClass, title}) => (
  <header className="view-header">
    <h3><i className={iconClass} /> {title}</h3><NewBookmarkBtn/>
  </header>
);
