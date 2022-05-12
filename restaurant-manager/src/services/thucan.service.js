import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { v4 } from "uuid";
import { createContext, useContext, useEffect, useState } from "react";
import {db, storage} from "./firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const temp = {
  Gia: Number(0),
  LoaiThucAn: String(""),
  TenThucAn: String(""),
  ImgSrc: String(""),
};

const context = createContext();

export const useDishService = () => {
  return useContext(context);
};

export default function ProviderDishService({ children }) {
  const auth = ThucAnDataService();
  return <context.Provider value={auth}>{children}</context.Provider>;
}

const ThucAnRef = collection(db, "ThucAn");

function ThucAnDataService() {

  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(ThucAnRef, snapshot => {
      setDishes(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    })

    return ()=>{
      unsubscribe();
    }
  }, [])

  const addThucAn = async (newThucAn) => {
    return await addDoc(ThucAnRef, newThucAn);
  };

  const updateThucAn = async (id, updateThucAn) => {
    const docThucAn = doc(db, "ThucAn", id);
    return await updateDoc(docThucAn, updateThucAn);
  };

  const deleteThucAn = async (id) => {
    const ThucAnDoc = doc(db, "ThucAn", id);
    return await deleteDoc(ThucAnDoc);
  };

  const getThucAn = async (id) => {
    const ThucAnDoc = doc(db, "ThucAn", id);
    return await getDoc(ThucAnDoc).then(res =>{
      return {id: res.id, data: res.data()}
    });
  };

  const uploadImg = (file) => {
    if (!file) return;
    const name = v4();
    const storageRef = ref(storage, `/images/${name}`);
    return uploadBytes(storageRef, file).then(() =>
      getDownloadURL(storageRef).then(url => url)
    );
  }

  return {
    dishes,
    addThucAn,
    updateThucAn,
    deleteThucAn,
    getThucAn,
    uploadImg,
  };
}
