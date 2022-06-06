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
import {db} from "./firebase";

const temp = {
  IdDatBan: String(""),
  MonAn: String("")
};
const context = createContext();

export const useCT_DatMonService = () => {
  return useContext(context);
};

export default function ProviderCTDatMonService({ children }) {
  const value = CT_DatMonDataService();
  return <context.Provider value={value}>{children}</context.Provider>;
}

const CT_DatMonRef = collection(db, "CT_DatMon");

function CT_DatMonDataService() {
  const [ct_DatMon, setCT_DatMon] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(CT_DatMonRef, (snapshot) => {
      setCT_DatMon(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const addCT_DatMon = async (newCT_DatMon) => {
    return await addDoc(CT_DatMonRef, newCT_DatMon);
  };

  const updateCT_DatMon = async (id, updateCT_DatMon) => {
    const docCT_DatMon = doc(db, "CT_DatMon", id);
    return await updateDoc(docCT_DatMon, updateCT_DatMon);
  };

  const deleteCT_DatMon = async (id) => {
    const CT_DatMonDoc = doc(db, "CT_DatMon", id);
    return await deleteDoc(CT_DatMonDoc);
  };

  const getAllCT_DatMon = async () => {
    return await getDocs(CT_DatMonRef);
  };

  const getCT_DatMon = async (id) => {
    const CT_DatMonDoc = doc(db, "CT_DatMon", id);
    return await getDoc(CT_DatMonDoc);
  };

  return {
    ct_DatMon,
    addCT_DatMon,
    updateCT_DatMon,
    deleteCT_DatMon,
    getAllCT_DatMon,
    getCT_DatMon
  }
}