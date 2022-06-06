import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  Timestamp,
  query,
  onSnapshot,
  where
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase";

const temp = {
  ID: String(""),
  IdDatBan: String(""),
  Ban: String(""),
};

const context = createContext();

export const CT_DatBanService = () => {
  return useContext(context);
};

export default function ProviderCTTableService({ children }) {
  const value = CT_DatBanDataService();
  return <context.Provider value={value}>{children}</context.Provider>;
}

const CT_DatBanRef = collection(db, "CT_DatBan");

function CT_DatBanDataService(){


  const addCT_DatBan = async (newCT_DatBan) => {
    return await addDoc(CT_DatBanRef, newCT_DatBan);
  };

  const updateCT_DatBan = async (id, updateCT_DatBan) => {
    const docCT_DatBan = doc(db, "CT_DatBan", id);
    return await updateDoc(docCT_DatBan, updateCT_DatBan);
  };

  const deleteCT_DatBan = async (id) => {
    const CT_DatBanDoc = doc(db, "CT_DatBan", id);
    return await deleteDoc(CT_DatBanDoc);
  };

  const getAllCT_DatBan = async () => {
    return await getDocs(CT_DatBanRef);
  };

  const getCT_DatBan = async (id) => {
    const CT_DatBanDoc = doc(db, "CT_DatBan", id);
    return await getDoc(CT_DatBanDoc);
  };
  
  const getCT_DatBanByID_DB = (id) => {
    const getByIDDB = query(CT_DatBanRef, where("ID_DatBan", "==", id))
    return getDocs(getByIDDB).then(res => res.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    // return onSnapshot(getByIDDB, (snapshot) => {
    //   return(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    // });
  }

  return {
    addCT_DatBan,
    updateCT_DatBan,
    deleteCT_DatBan,
    getAllCT_DatBan,
    getCT_DatBanByID_DB,
    getCT_DatBan
  }
}
