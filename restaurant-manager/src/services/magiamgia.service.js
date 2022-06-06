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
  GiaTri: Number(0),
  NgayHetHan: Timestamp(),
  TenMa: String(""),
};

const MaGiamGiaRef = collection(db, "MaGiamGia");

function MaGiamGiaDataService() {
  const addMaGiamGia = async (newMaGiamGia) => {
    return await addDoc(MaGiamGiaRef, newMaGiamGia);
  };

  const updateMaGiamGia = async (id, updateMaGiamGia) => {
    const docMaGiamGia = doc(db, "MaGiamGia", id);
    return await updateDoc(docMaGiamGia, updateMaGiamGia);
  };

  const deleteMaGiamGia = async (id) => {
    const MaGiamGiaDoc = doc(db, "MaGiamGia", id);
    return await deleteDoc(MaGiamGiaDoc);
  };

  const getAllMaGiamGia = async () => {
    return await getDocs(MaGiamGiaRef);
  };

  const getMaGiamGia = async (id) => {
    const MaGiamGiaDoc = doc(db, "MaGiamGia", id);
    return await getDoc(MaGiamGiaDoc);
  };

  return {
    addMaGiamGia,
    updateMaGiamGia,
    deleteMaGiamGia,
    getAllMaGiamGia,
    getMaGiamGia
  }
}

export default new MaGiamGiaDataService();
