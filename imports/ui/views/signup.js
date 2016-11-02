import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import { Link } from 'react-router';
import { handleSignup } from '../../modules/signup';
import { renderErrorsFor } from '../../modules/utils';

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentDidMount() {
    // handleSignup({ component: this });
  }

  _handleSubmit(event) {
    event.preventDefault();

    const inputData = {
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      passwordConfirmation: this.refs.passwordConfirmation.value,
    };

    if(this._validateInputData(inputData)){
      Accounts.createUser({
        email: inputData.email,
        password: inputData.password
      }, function(error) {
        if (error) {
          return false;
        }

        Meteor.call("addFolder", 'Home', 'Description', true);
        Meteor.setTimeout(function(){ FlowRouter.go('folders'); }, 10);
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

    if (inputData.passwordConfirmation !== inputData.password) {
      errors.passwordConfirmation = 'Please confirm your password';
    }

    if (inputData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.'
    }

    this.setState({errors: errors});

    return (errors.length === 0);

  }

  render() {
    const errors = this.state.errors;
    return (
      <div className='view-container sessions new'>
       <main>
         <header>
           <div className="logo" />
         </header>
         <form ref="signup" id="sign_up_form" onSubmit={this._handleSubmit}>
           <div className="field">
             <input ref="firstName" id="firstName" type="text" placeholder="First name" required={true} />
             {renderErrorsFor(errors, 'firstName')}
           </div>
           <div className="field">
             <input ref="lastName" id="lastName" type="text" placeholder="Last name" required={true} />
             {renderErrorsFor(errors, 'lastName')}
           </div>
           <div className="field">
             <input ref="email" id="email" type="email" placeholder="Email" required={true} />
             {renderErrorsFor(errors, 'email')}
           </div>
           <div className="field">
             <input ref="password" id="password" type="password" placeholder="Password" required={true} />
             {renderErrorsFor(errors, 'password')}
           </div>
           <div className="field">
             <input ref="passwordConfirmation" id="passwordConfirmation" type="password" placeholder="Confirm password" required={true} />
             {renderErrorsFor(errors, 'passwordConfirmation')}
           </div>
           <button type="submit">Sign Up</button>
         </form>
         <a href="/signin">Have account? Log In</a>
       </main>
     </div>
    );
  }
}
