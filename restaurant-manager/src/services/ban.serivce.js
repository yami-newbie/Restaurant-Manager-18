import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  Timestamp,
  onSnapshot,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase";


const temp = {
  TenBan: String(""),
  TrangThai: Boolean(true)
};

const context = createContext();

export const useTableService = () => {
  return useContext(context);
};

export default function ProviderTableService({ children }) {
  const auth = BanDataService();
  return <context.Provider value={auth}>{children}</context.Provider>;
}

const BanRef = collection(db, "Ban");

function BanDataService() {
  
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(BanRef, (snapshot) => {
      setTables(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addBan = async (newBan) => {
    return await addDoc(BanRef, newBan);
  };

  const updateBan = async (id, updateBan) => {
    const docBan = doc(db, "Ban", id);
    return await updateDoc(docBan, updateBan);
  };

  const deleteBan = async (id) => {
    const BanDoc = doc(db, "Ban", id);
    return await deleteDoc(BanDoc);
  };

  const getAllBan = async () => {
    return await getDocs(BanRef);
  };

  const getBan = async (id) => {
    const BanDoc = doc(db, "Ban", id);
    return await getDoc(BanDoc);
  };

  return {
    tables,
    updateBan,
    addBan,
    deleteBan,
    getAllBan,
    getBan
  }
}
