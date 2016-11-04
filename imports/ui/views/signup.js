import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { renderErrorsFor } from '../../modules/utils';

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {}
    };
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(event) {
    event.preventDefault();

    const inputData = {
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
          Bert.alert(error.reason, 'danger');
        } else {
          Meteor.call("addFolder", 'Home', 'Description', true);
          browserHistory.push('/');
          Bert.alert('Welcome!', 'success');
        }


        // Meteor.setTimeout(function(){ FlowRouter.go('folders'); }, 10);
        // const { location } = component.props;
        // if (location.state && location.state.nextPathname) {
        //   browserHistory.push(location.state.nextPathname);
        // } else {
        //   browserHistory.push('/');
        // }
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
    else if (inputData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (inputData.passwordConfirmation !== inputData.password) {
      errors.passwordConfirmation = 'Passwords do not match';
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
         <form ref="signup" id="sign_up_form" onSubmit={this._handleSubmit}>
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
         <Link to="/login">Have account? Log In</Link>
       </main>
     </div>
    );
  }
}
