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

class CT_DatMonDataService {
  addCT_DatMon = async (newCT_DatMon) => {
    return await addDoc(CT_DatMonRef, newCT_DatMon);
  };

  updateCT_DatMon = async (id, updateCT_DatMon) => {
    const docCT_DatMon = doc(db, "CT_DatMon", id);
    return await updateDoc(docCT_DatMon, updateCT_DatMon);
  };

  deleteCT_DatMon = async (id) => {
    const CT_DatMonDoc = doc(db, "CT_DatMon", id);
    return await deleteDoc(CT_DatMonDoc);
  };

  getAllCT_DatMon = async () => {
    return await getDocs(CT_DatMonRef);
  };

  getCT_DatMon = async (id) => {
    const CT_DatMonDoc = doc(db, "CT_DatMon", id);
    return await getDoc(CT_DatMonDoc);
  };
}

export default new CT_DatMonDataService();
