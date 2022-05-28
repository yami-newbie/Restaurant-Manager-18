import { React, useEffect, useState} from 'react'
import db from '../firebase';
import {
  doc,
  collection,
  addDoc,
  query,
  onSnapshot,
  getDocs,
  getDocFromCache,
  updateDoc,
} from "firebase/firestore";
import { async } from '@firebase/util';
import SignIn from './Account/SignIn';
import SignUp from './Account/SignUp';
import ForgotPassword from './Account/ForgotPassword';

function App() {
  const [array, setArray] = useState([]);
  const [colorname, setColorname] = useState("");
  const [colorvalue, setColorvalue] = useState("");
  const arrcolection = collection(db, "array");

  const createColor = async () => {
    await addDoc(arrcolection, {color: colorname, value: colorvalue})
  }

  const updateColor = async (id, newname, newvalue) => {
    const colorDoc = doc(db, "array", id)
    const newFields = {
      color: newname,
      value: newvalue
    }
    await updateDoc(colorDoc, newFields)
  }

  useEffect(() => {
    const getArr = async () => {
      const data = await getDocs(arrcolection)
      setArray(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getArr();
  }, [])

  return (
    <div>
      {/* <SignIn /> <br></br> */}
      {/* <SignUp /> <br></br> */}
      <ForgotPassword />
    </div>
  );
}

export default App;
