import {
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile
} from 'firebase/auth'
import {auth} from './firebase';

class AccountService {
  login = (user) => {
    return signInWithEmailAndPassword(auth, user.username, user.password);
  };

  register = async (newUser) => {
    return await createUserWithEmailAndPassword(
      auth,
      newUser.username,
      newUser.password
    ).then(() => {
        console.log(auth.currentUser)
        updateProfile(auth.currentUser, {
            displayName: newUser.displayName
        })
    })
  };

  logout = async () => {
    await auth.signOut();
  };

  resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };
}

export default new AccountService();