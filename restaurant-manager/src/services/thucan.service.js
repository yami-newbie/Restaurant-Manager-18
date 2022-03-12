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

class ThucAnDataService {
  addThucAn = async (newThucAn) => {
    return await addDoc(ThucAnRef, newThucAn);
  };

  updateThucAn = async (id, updateThucAn) => {
    const docThucAn = doc(db, "ThucAn", id);
    return await updateDoc(docThucAn, updateThucAn);
  };

  deleteThucAn = async (id) => {
    const ThucAnDoc = doc(db, "ThucAn", id);
    return await deleteDoc(ThucAnDoc);
  };

  getAllThucAn = async () => {
    return await getDocs(ThucAnRef);
  };

  getThucAn = async (id) => {
    const ThucAnDoc = doc(db, "ThucAn", id);
    return await getDoc(ThucAnDoc);
  };
}

export default new ThucAnDataService();
