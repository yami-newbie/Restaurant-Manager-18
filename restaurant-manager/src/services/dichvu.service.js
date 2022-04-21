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

function DichVuDataService() {
  const addDichVu = async (newDichVu) => {
    return await addDoc(DichVuRef, newDichVu);
  };

  const updateDichVu = async (id, updateDichVu) => {
    const docDichVu = doc(db, "DichVu", id);
    return await updateDoc(docDichVu, updateDichVu);
  };

  const deleteDichVu = async (id) => {
    const DichVuDoc = doc(db, "DichVu", id);
    return await deleteDoc(DichVuDoc);
  };

  const getAllDichVu = async () => {
    return await getDocs(DichVuRef);
  };

  const getDichVu = async (id) => {
    const DichVuDoc = doc(db, "DichVu", id);
    return await getDoc(DichVuDoc);
  };

  return {
    addDichVu,
    updateDichVu,
    deleteDichVu,
    getAllDichVu,
    getDichVu
  }
}

export default DichVuDataService;
