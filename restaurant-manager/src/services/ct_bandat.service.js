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

class CT_BanDatDataService {
  addCT_BanDat = async (newCT_BanDat) => {
    return await addDoc(CT_BanDatRef, newCT_BanDat);
  };

  updateCT_BanDat = async (id, updateCT_BanDat) => {
    const docCT_BanDat = doc(db, "CT_BanDat", id);
    return await updateDoc(docCT_BanDat, updateCT_BanDat);
  };

  deleteCT_BanDat = async (id) => {
    const CT_BanDatDoc = doc(db, "CT_BanDat", id);
    return await deleteDoc(CT_BanDatDoc);
  };

  getAllCT_BanDat = async () => {
    return await getDocs(CT_BanDatRef);
  };

  getCT_BanDat = async (id) => {
    const CT_BanDatDoc = doc(db, "CT_BanDat", id);
    return await getDoc(CT_BanDatDoc);
  };
}

export default new CT_BanDatDataService();
