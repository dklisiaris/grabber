import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { renderErrorsFor } from '../../modules/utils';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(event) {
    event.preventDefault();

    const { location } = this.props;
    const inputData = {
      email: this.refs.email.value,
      password: this.refs.password.value,
    };

    if(this._validateInputData(inputData)){
      Meteor.loginWithPassword(inputData.email, inputData.password, function(error) {
        if (error) {
          Bert.alert(error.reason, 'warning');
        }
        else {
          if (location.state && location.state.nextPathname) {
            browserHistory.push(location.state.nextPathname);
          } else {
            browserHistory.push('/');
          }
        }
      });
    }
  }

  _validateInputData(inputData) {
    let errors = {};

    if (! inputData.email) {
      errors.email = 'Email required';
    }

    if (! inputData.password) {
      errors.password = 'Password required';
    }

    this.setState({errors: errors});

    return (Object.keys(errors).length === 0);

  }

  render() {
    const errors = this.state.errors;
    return (
      <div className='view-container sessions new'>
       <main>
         <header>
           <div className="logo" />
         </header>
         <form ref="login" id="sign_in_form" onSubmit={this._handleSubmit}>
           <div className="field">
             <input
               ref="email"
               type="Email"
               id="user_email"
               placeholder="Email"
               required="true"/>
              {renderErrorsFor(errors, 'email')}
           </div>
           <div className="field">
             <input
               ref="password"
               type="password"
               id="user_password"
               placeholder="Password"
               required="true"/>
              {renderErrorsFor(errors, 'password')}
           </div>
           <button type="submit">Sign in</button>
         </form>
         <Link to="/signup">Create new account</Link>
       </main>
     </div>
    );
  }
}
