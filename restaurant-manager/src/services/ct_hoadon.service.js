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

function CT_HoaDonDataService() {
  const addCT_HoaDon = async (newCT_HoaDon) => {
    return await addDoc(CT_HoaDonRef, newCT_HoaDon);
  };

  const updateCT_HoaDon = async (id, updateCT_HoaDon) => {
    const docCT_HoaDon = doc(db, "CT_HoaDon", id);
    return await updateDoc(docCT_HoaDon, updateCT_HoaDon);
  };

  const deleteCT_HoaDon = async (id) => {
    const CT_HoaDonDoc = doc(db, "CT_HoaDon", id);
    return await deleteDoc(CT_HoaDonDoc);
  };

  const getAllCT_HoaDon = async () => {
    return await getDocs(CT_HoaDonRef);
  };

  const getCT_HoaDon = async (id) => {
    const CT_HoaDonDoc = doc(db, "CT_HoaDon", id);
    return await getDoc(CT_HoaDonDoc);
  };

  return {
    addCT_HoaDon,
    updateCT_HoaDon,
    deleteCT_HoaDon,
    getAllCT_HoaDon,
    getCT_HoaDon
  }
}

export default CT_HoaDonDataService;
