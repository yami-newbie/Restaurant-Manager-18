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
  ID: String(""),
  IdDatBan: String(""),
  Ban: String(""),
};

const context = createContext();

export const useCT_TableService = () => {
  return useContext(context);
};

export default function ProviderCTTableService({ children }) {
  const value = CT_BanDatDataService();
  return <context.Provider value={value}>{children}</context.Provider>;
}

const CT_BanDatRef = collection(db, "CT_BanDat");

function CT_BanDatDataService() {
  const [ct_tables, setCT_Tables] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(CT_BanDatRef, (snapshot) => {
      setCT_Tables(
        snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const addCT_BanDat = async (newCT_BanDat) => {
    return await addDoc(CT_BanDatRef, newCT_BanDat);
  };

  const updateCT_BanDat = async (id, updateCT_BanDat) => {
    const docCT_BanDat = doc(db, "CT_BanDat", id);
    return await updateDoc(docCT_BanDat, updateCT_BanDat);
  };

  const deleteCT_BanDat = async (id) => {
    const CT_BanDatDoc = doc(db, "CT_BanDat", id);
    return await deleteDoc(CT_BanDatDoc);
  };

  const getAllCT_BanDat = async () => {
    return await getDocs(CT_BanDatRef);
  };

  const getCT_BanDat = async (id) => {
    const CT_BanDatDoc = doc(db, "CT_BanDat", id);
    return await getDoc(CT_BanDatDoc);
  };

  return {
    ct_tables,
    addCT_BanDat,
    updateCT_BanDat,
    deleteCT_BanDat,
    getAllCT_BanDat,
    getCT_BanDat,
  };
}
