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

function BanDataService() {

  const addBan = async (newBan) => {
    return await addDoc(BanRef, newBan);
  };

  const updateBan = async (id, updateBan) => {
    const docBan = doc(db, "Ban", id);
    return await updateDoc(docBan, updateBan);
  };

  const deleteBan = async (id) => {
    const BanDoc = doc(db, "Ban", id);
    return await deleteDoc(BanDoc);
  };

  const getAllBan = async () => {
    return await getDocs(BanRef);
  };

  const getBan = async (id) => {
    const BanDoc = doc(db, "Ban", id);
    return await getDoc(BanDoc);
  };

  return {
    updateBan,
    addBan,
    deleteBan,
    getAllBan,
    getBan
  }
}

export default BanDataService;

