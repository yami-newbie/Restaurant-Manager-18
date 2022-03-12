import { React } from 'react'
import SignUp from './Account/SignUp';
import {auth} from '../firebase';
import SignIn from './Account/SignIn';
import accountService from '../services/account.service';

function App() {
  console.log(auth.currentUser);
  return (
    <div>
      <SignUp />
      <div>
        <button onClick={ async () => await accountService.logout()}>
          Log Out
        </button>
        <p>DisplayName: {auth.currentUser?.displayName}</p>
      </div>
      <SignIn/>
      <div>
        <button onClick={ async () => {
          const user = auth.currentUser;
          if(user !== null)
            await accountService.resetPassword(user.email);
          else
            console.log("Chua dang nhap")
          }
          }>
          Reset Password
        </button>
      </div>
      
    </div>
  );
}

export default App;
