import React from 'react';
import { Link } from 'react-router';
import { handleSignup } from '../../modules/signup';

export class Signup extends React.Component {
  componentDidMount() {
    handleSignup({ component: this });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className='view-container sessions new'>
       <main>
         <header>
           <div className="logo" />
         </header>
         <form id="sign_up_form">
           <div className="field">
             <input ref="firstName" id="user_first_name" type="text" placeholder="First name" required={true} />
           </div>
           <div className="field">
             <input ref="lastName" id="user_last_name" type="text" placeholder="Last name" required={true} />
           </div>
           <div className="field">
             <input ref="email" id="user_email" type="email" placeholder="Email" required={true} />
           </div>
           <div className="field">
             <input ref="password" id="user_password" type="password" placeholder="Password" required={true} />
           </div>
           <div className="field">
             <input ref="passwordConfirmation" id="user_password_confirmation" type="password" placeholder="Confirm password" required={true} />
           </div>
           <button type="submit">Sign Up</button>
         </form>
         <a href="/signin">Have account? Log In</a>
       </main>
     </div>
    );
  }
}
