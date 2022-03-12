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
  GiaDichVu: Number(0),
  TenDichVu: String(""),
};

const DichVuRef = collection(db, "DichVu");

class DichVuDataService {
  addDichVu = async (newDichVu) => {
    return await addDoc(DichVuRef, newDichVu);
  };

  updateDichVu = async (id, updateDichVu) => {
    const docDichVu = doc(db, "DichVu", id);
    return await updateDoc(docDichVu, updateDichVu);
  };

  deleteDichVu = async (id) => {
    const DichVuDoc = doc(db, "DichVu", id);
    return await deleteDoc(DichVuDoc);
  };

  getAllDichVu = async () => {
    return await getDocs(DichVuRef);
  };

  getDichVu = async (id) => {
    const DichVuDoc = doc(db, "DichVu", id);
    return await getDoc(DichVuDoc);
  };
}

export default new DichVuDataService();
