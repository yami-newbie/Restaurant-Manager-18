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
  Gia: Number(0),
  SoLuong: Number(0),
  IDHoaDon: String(""),
  IDThucAn: String(""),
};

const CT_HoaDonRef = collection(db, "CT_HoaDon");

class CT_HoaDonDataService {
  addCT_HoaDon = async (newCT_HoaDon) => {
    return await addDoc(CT_HoaDonRef, newCT_HoaDon);
  };

  updateCT_HoaDon = async (id, updateCT_HoaDon) => {
    const docCT_HoaDon = doc(db, "CT_HoaDon", id);
    return await updateDoc(docCT_HoaDon, updateCT_HoaDon);
  };

  deleteCT_HoaDon = async (id) => {
    const CT_HoaDonDoc = doc(db, "CT_HoaDon", id);
    return await deleteDoc(CT_HoaDonDoc);
  };

  getAllCT_HoaDon = async () => {
    return await getDocs(CT_HoaDonRef);
  };

  getCT_HoaDon = async (id) => {
    const CT_HoaDonDoc = doc(db, "CT_HoaDon", id);
    return await getDoc(CT_HoaDonDoc);
  };
}

export default new CT_HoaDonDataService();
