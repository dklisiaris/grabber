import $ from 'jquery';
import 'jquery-validation';
import { browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import { getInputValue } from './get-input-value';

let component;

const getUserData = () => ({
  email: getInputValue(component.refs.email),
  password: getInputValue(component.refs.password),
  passwordConfirmation: getInputValue(component.refs.passwordConfirmation),
  profile: {
    name: {
      first: getInputValue(component.refs.firstName),
      last: getInputValue(component.refs.lastName),
    },
  },
});

const signUp = () => {
  const user = getUserData();

  Accounts.createUser(user, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      // browserHistory.push('/');
      Meteor.setTimeout(function(){ FlowRouter.go('folders'); }, 10);
      Bert.alert('Welcome!', 'success');
    }
  });
};

const validate = () => {
  $(component.refs.signup).validate({
    rules: {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      email: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
    },
    messages: {
      firstName: {
        required: 'First name?',
      },
      lastName: {
        required: 'Last name?',
      },
      email: {
        required: 'Need an email address here.',
        email: 'Is this email address legit?',
      },
      password: {
        required: 'Need a password here.',
        minlength: 'Use at least six characters, please.',
      },
    },
    submitHandler() { signUp(); },
  });
};

export const handleSignup = (options) => {
  component = options.component;
  validate();
};
