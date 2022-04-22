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
import db from "../firebase";

const temp = {
  IdDatBan: String(""),
  Ban: String(""),
};

const CT_BanDatRef = collection(db, "CT_BanDat");

function CT_BanDatDataService(){
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
    addCT_BanDat,
    updateCT_BanDat,
    deleteCT_BanDat,
    getAllCT_BanDat,
    getCT_BanDat
  }
}

export default CT_BanDatDataService;
