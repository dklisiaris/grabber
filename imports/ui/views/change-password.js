import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { renderErrorsFor } from '../../modules/utils';

export class ChangePassword extends React.Component {
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
      oldPassword:          this.refs.oldPassword.value,
      password:             this.refs.password.value,
      passwordConfirmation: this.refs.passwordConfirmation.value
    };

    if(this._validateInputData(inputData)){
      Accounts.changePassword(inputData.oldPassword, inputData.password, (error) => {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          browserHistory.push('/');
          Bert.alert('Password changed!', 'success');
        }
      });
    }
  }

  _validateInputData(inputData) {
    let errors = {};

    if (! inputData.oldPassword) {
      errors.oldPassword = 'Old password is required';
    }

    if (! inputData.password) {
      errors.password = 'New Password is required';
    }
    else if (inputData.password.length < 6) {
      errors.password = 'Passwords must be at least 6 characters.';
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
         <form ref="changePassword" id="change-password-form" onSubmit={this._handleSubmit}>
           <div className="field">
             <input
               ref="oldPassword"
               type="password"
               id="old-user-password"
               placeholder="Old Password"
               required={true}/>
              {renderErrorsFor(errors, 'oldPassword')}
           </div>
           <div className="field">
             <input
              ref="password"
              id="password"
              type="password"
              placeholder="New Password"
              required={true} />
             {renderErrorsFor(errors, 'password')}
           </div>
           <div className="field">
             <input
              ref="passwordConfirmation"
              id="password-confirmation"
              type="password"
              placeholder="Confirm New Password"
              required={true} />
             {renderErrorsFor(errors, 'passwordConfirmation')}
           </div>
           <button type="submit">Change Password</button>
         </form>
         <Link to="/login">Login with current password</Link>
       </main>
     </div>
    );
  }
}
