import React from 'react';
import { Meteor } from 'meteor/meteor';

import AppNavigation from '../containers/app-navigation';

export class App extends React.Component {
  propTypes: {
    children: React.PropTypes.element.isRequired,
  }

  _renderNavigation(){
    if(Meteor.userId()){
      return(
        <AppNavigation />
      );
    }
  }

  render(){
    return(
      <div id="app">
        {this._renderNavigation()}
        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}
