import React from 'react';
import { Link } from 'react-router';
import { handleLogin } from '../../modules/login';

export class Login extends React.Component {
  componentDidMount() {
    handleLogin({ component: this });
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
         <form ref="login" id="sign_in_form" onSubmit={this.handleSubmit}>
           <div className="field">
             <input
               ref="email"
               type="Email"
               id="user_email"
               placeholder="Email"
               required="true"/>
           </div>
           <div className="field">
             <input
               ref="password"
               type="password"
               id="user_password"
               placeholder="Password"
               required="true"/>
           </div>
           <button type="submit">Sign in</button>
         </form>
         <a href="/register">Create new account</a>
       </main>
     </div>
    );
  }
}
