import React from 'react';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';

const _handleClick = (id) => {
  browserHistory.push('/folders/' + id);
}

export const Folder = ({id, name}) => (
  <div id={id} className="board" onClick={() => _handleClick(id)}>
    <div className="inner">
      <h4>{name}</h4>
    </div>
  </div>
);

export const AbsFolder = ({id, name}) => (
  <div id={id} className="folder" onClick={() => _handleClick(id)}>
    <div className="inner">
      <div className="title-wrapper">
        <span>{name}</span>
      </div>
    </div>
  </div>
);
