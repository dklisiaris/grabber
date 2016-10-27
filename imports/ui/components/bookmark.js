import React from 'react';

export class Bookmark extends React.Component {

  render() {
    return (
      <div id={this.props.id} className="bookmark-card">
        <div className="inner">
          <h4>{this.props.title}</h4>
          <a href={this.props.url} target="_blank" className="clickable-url">
            <img src={this.props.thumbnail} alt="thumbnail" width="100%"/>
          </a>
        </div>

      </div>
    );
  }
}
