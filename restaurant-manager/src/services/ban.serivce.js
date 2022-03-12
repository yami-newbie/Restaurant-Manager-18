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
  TenBan: String(""),
  TrangThai: Boolean(true)
};

const BanRef = collection(db, "Ban");

class BanDataService {
  addBan = async (newBan) => {
    return await addDoc(BanRef, newBan);
  };

  updateBan = async (id, updateBan) => {
    const docBan = doc(db, "Ban", id);
    return await updateDoc(docBan, updateBan);
  };

  deleteBan = async (id) => {
    const BanDoc = doc(db, "Ban", id);
    return await deleteDoc(BanDoc);
  };

  getAllBan = async () => {
    return await getDocs(BanRef);
  };

  getBan = async (id) => {
    const BanDoc = doc(db, "Ban", id);
    return await getDoc(BanDoc);
  };
}

export default new BanDataService();

