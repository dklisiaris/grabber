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
         <form id="sign_in_form">
           <div className="field">
             <input
               ref="email"
               type="Email"
               id="user_email"
               placeholder="Email"
               required="true"
               defaultValue="john@boomabu.com"/>
           </div>
           <div className="field">
             <input
               ref="password"
               type="password"
               id="user_password"
               placeholder="Password"
               required="true"
               defaultValue="12345678"/>
           </div>
           <button type="submit">Sign in</button>
         </form>
         <Link to="/signup">Create new account</Link>
       </main>
     </div>
    );
  }
}
