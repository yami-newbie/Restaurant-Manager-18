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

class MaGiamGiaDataService {
  addMaGiamGia = async (newMaGiamGia) => {
    return await addDoc(MaGiamGiaRef, newMaGiamGia);
  };

  updateMaGiamGia = async (id, updateMaGiamGia) => {
    const docMaGiamGia = doc(db, "MaGiamGia", id);
    return await updateDoc(docMaGiamGia, updateMaGiamGia);
  };

  deleteMaGiamGia = async (id) => {
    const MaGiamGiaDoc = doc(db, "MaGiamGia", id);
    return await deleteDoc(MaGiamGiaDoc);
  };

  getAllMaGiamGia = async () => {
    return await getDocs(MaGiamGiaRef);
  };

  getMaGiamGia = async (id) => {
    const MaGiamGiaDoc = doc(db, "MaGiamGia", id);
    return await getDoc(MaGiamGiaDoc);
  };
}

export default new MaGiamGiaDataService();
