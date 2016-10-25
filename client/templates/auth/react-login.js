import './react-login.html';
import {Login} from '/imports/ui/views/login';

Template.reactLogin.helpers({
  Login() {
    return Login;
  }
});
