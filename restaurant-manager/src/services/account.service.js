import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import { auth, db, storage } from "./firebase";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

export const Role = {
  admin: "admin",
  staff: "staff",
  all: "all"
};

const TaiKhoanRef = collection(db, "TaiKhoan");

function useProvideAuth() {
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const [data, setData] = useState();
  const [taiKhoan, setTaiKhoan] = useState();
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async ({ email, password }) => {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      }).catch(e => {
        throw e;
      });
  };
  const signup = async ({ email, password, displayName, role }) => {
    return await createUserWithEmailAndPassword(auth, email, password).then(
      (response) => {
        setUser(response.user);
        updateProfile(response.user, {
          displayName: displayName,
        });
        setDoc(doc(db, "TaiKhoan", response.user.uid), {
          role: role,
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
  const _updateProfile = async ({displayName, phoneNumber, photoURL, address}) => {
    const userdoc = doc(db, "TaiKhoan", user.uid);
    setDoc(userdoc, {
      role: role,
      phoneNumber: phoneNumber ? phoneNumber : "",
      address: address ? address : "",
    })

    return updateProfile(user, {
      displayName: displayName,
      photoURL: photoURL
    }).catch(console.log);
  }

  const uploadImg = (file) => {
    if (!file) return;
    const name = v4();
    const storageRef = ref(storage, `/avatar/${name}`);
    return uploadBytes(storageRef, file).then(() => getDownloadURL(storageRef));
  }

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
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(TaiKhoanRef, (snapshot) => {
      setTaiKhoan(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if(taiKhoan && user){
      setData(taiKhoan.filter(e => e.id === user.uid)[0].data)
    }
  }, [taiKhoan, user])

  useEffect(() => {
    if(user){
      console.log(user)
      const roleRef = doc(db, "TaiKhoan", user.uid)
      getDoc(roleRef).then((res) => {
        setRole(res.data().role);
      });
    }
  }, [user])

  // Return the user object and auth methods
  return {
    user,
    role,
    data,
    signin,
    signup,
    signout,
    _sendPasswordResetEmail,
    _confirmPasswordReset,
    _updateProfile,
    uploadImg
  };
}
