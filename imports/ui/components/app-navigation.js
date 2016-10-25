import React from 'react';
import { Link } from 'react-router';
import Gravatar from 'react-gravatar';

export const AppNavigation = () => (
  <header className="main-header">
    <nav id="boards_nav">
      <ul>
        <li>
          <a href="/folders"><i className="fa fa-folder-o"/> Folders</a>
        </li>
      </ul>
    </nav>
    <Link to='/'>
      <span className='logo'/>
    </Link>
    <nav className="right">
      <ul>
        <li>
          <a className="current-user">
            <Gravatar className="react-gravatar" email="fadscs@fds.com"/> Mits Dogger
          </a>
        </li>
        <li>
          <a href="/logout"><i className="fa fa-sign-out"/> Sign out</a>
        </li>
      </ul>
    </nav>
  </header>
);
