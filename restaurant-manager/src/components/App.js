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
      <input
        placeholder="Color"
        onChange={(e) => {
          setColorname(e.target.value);
        }}
      />
      <input
        placeholder="Value"
        onChange={(e) => {
          setColorvalue(e.target.value);
        }}
      />
      <button onClick={createColor}>Create</button>
      {array.map((arr) => {
        return (
          <div>
            <h4>Color: {arr.color}</h4>
            <h5>Value: {arr.value}</h5>
          </div>
        );
      })}
    </div>
  );
}

export default App;
