import React from 'react';
import {Meteor} from 'meteor/meteor';

const _handleClick = (id) => {
  const f_url = 'folders/' + id;
  console.log(id);
  Meteor.setTimeout(() => { FlowRouter.go('folder', { _id: id }); }, 10);
}

export const Folder = ({id, name}) => (
  <div id={id} className="board" onClick={() => _handleClick(id)}>
    <div className="inner">
      <h4>{name}</h4>
    </div>
  </div>
);
