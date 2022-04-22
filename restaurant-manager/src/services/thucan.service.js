import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import db from "../firebase";

const temp = {
  Gia: Number(0),
  LoaiThucAn: String(""),
  TenThucAn: String(""),
};

const ThucAnRef = collection(db, "ThucAn");

function ThucAnDataService() {
  const addThucAn = async (newThucAn) => {
    return await addDoc(ThucAnRef, newThucAn);
  };

  const updateThucAn = async (id, updateThucAn) => {
    const docThucAn = doc(db, "ThucAn", id);
    return await updateDoc(docThucAn, updateThucAn);
  };

  const deleteThucAn = async (id) => {
    const ThucAnDoc = doc(db, "ThucAn", id);
    return await deleteDoc(ThucAnDoc);
  };

  const getAllThucAn = async () => {
    return await getDocs(ThucAnRef);
  };

  const getThucAn = async (id) => {
    const ThucAnDoc = doc(db, "ThucAn", id);
    return await getDoc(ThucAnDoc);
  };

  return {
    addThucAn,
    updateThucAn,
    deleteThucAn,
    getAllThucAn,
    getThucAn
  }
}

export default new ThucAnDataService();
