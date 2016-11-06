import React from 'react';
import { Meteor } from 'meteor/meteor';

import AppNavigation from '../containers/app-navigation';

export class App extends React.Component {
  propTypes: {
    children: React.PropTypes.element.isRequired,
  }

  render(){
    return(
      <div id="app">
        <AppNavigation />
        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
