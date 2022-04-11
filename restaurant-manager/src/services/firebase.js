// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  confirmPasswordReset,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { useContext , createContext, useEffect, useState} from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTQVYCtG03UrL-sg8x0_xb8TZItG2BWaM",
  authDomain: "quanlynhahang-b44c4.firebaseapp.com",
  databaseURL: "https://quanlynhahang-b44c4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "quanlynhahang-b44c4",
  storageBucket: "quanlynhahang-b44c4.appspot.com",
  messagingSenderId: "993636431615",
  appId: "1:993636431615:web:484d07f53dfb579e02feca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const authContext = createContext();

const auth = getAuth(app);

export const db = getFirestore(app);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = ({ email, password }) => {
    return signInWithEmailAndPassword(auth, email, password).then((response) => {
      setUser(response.user);
      return response.user;
    });
  };
  const signup = ({ email, password, displayName }) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user);
        updateProfile(response.user, {
          displayName: displayName,
        });
        return response.user;
      }
    );
  };
  const signout = () => {
    return auth.signOut().then(() => {
      setUser(false);
    });
  };
  const _sendPasswordResetEmail = (email) => {
    return sendPasswordResetEmail(auth, email).then(() => {
      return true;
    });
  };
  const _confirmPasswordReset = (code, password) => {
    return confirmPasswordReset(auth, code, password).then(() => {
      return true;
    });
  };
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    _sendPasswordResetEmail,
    _confirmPasswordReset,
  };
}