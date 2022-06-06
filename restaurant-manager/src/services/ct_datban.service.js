import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  Timestamp,
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

  return {
    addCT_DatBan,
    updateCT_DatBan,
    deleteCT_DatBan,
    getAllCT_DatBan,
    getCT_DatBan
  }
}
