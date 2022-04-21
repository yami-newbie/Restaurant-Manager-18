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
  MonAn: String("")
};

const CT_DatMonRef = collection(db, "CT_DatMon");

function CT_DatMonDataService() {
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
    addCT_DatMon,
    updateCT_DatMon,
    deleteCT_DatMon,
    getAllCT_DatMon,
    getCT_DatMon
  }
}

export default CT_DatMonDataService;
