import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";

const authContext = createContext();

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
  const signin = async ({ email, password }) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      })
      .catch((e) => console.log(e));
  };
  const signup = async ({ email, password, displayName }) => {
    return await createUserWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user);
        updateProfile(response.user, {
          displayName: displayName,
        });
        return response.user;
      }
    );
  };
  const signout = async () => {
    return await auth.signOut().then(() => {
      setUser(false);
    });
  };
  const _sendPasswordResetEmail = async (email) => {
    return await sendPasswordResetEmail(auth, email).then(() => {
      return true;
    });
  };
  const _confirmPasswordReset = async (code, password) => {
    return await confirmPasswordReset(auth, code, password).then(() => {
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
