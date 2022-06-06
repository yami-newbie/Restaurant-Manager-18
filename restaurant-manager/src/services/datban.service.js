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
import { list } from "firebase/storage";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase";

const temp = {
    ID: String(""),
    Start: Date(),
    End: Date(),
};
const context = createContext();

export const useCT_OrderService = () => {
  return useContext(context);
};

export default function ProviderDatBanService({ children }) {
  const value = DatBanDataService();
  return <context.Provider value={value}>{children}</context.Provider>;
}

const DatBanRef = collection(db, "DatBan");

function DatBanDataService()
{
  const [datban, setDatban] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(DatBanRef, (snapshot) => {
      setDatban(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addDatBan = async (newDatBan) => {
    return await addDoc(DatBanRef, newDatBan)
  };

  const getDatBanByID = (id) => {
    return datban.filter((ct) => ct.data.ID = id)
  }
  const updateDatBan = async (id, updateDatBan) => {
    const docDatBan = doc(db, "DatBan", id);
    return await updateDoc(docDatBan, updateDatBan);
  };
  const deleteDatBan = async (id) => {
    const docDatBan = doc(db, "DatBan", id);
    return await deleteDoc(docDatBan);
  };
  const getAllDatBan = async () => {
    return await getDocs(DatBanRef);
  };
  const getDatBan = async (id) => {
    const DatBanDoc = doc(db, "DatBan", id);
    return await getDoc(DatBanDoc);
  };
  const deleteDatBanByID = async (id) => {
    const listDB = getDatBanByID(id);

    if (listDB.length>0){
      listDB.map(db => deleteDatBan(db.id));
    }
  }

  return {
    datban,
    addDatBan,
    updateDatBan,
    deleteDatBan,
    getAllDatBan,
    getDatBan,
    getDatBanByID,
    deleteDatBanByID
  }
}