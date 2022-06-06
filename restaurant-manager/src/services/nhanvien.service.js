import { addDoc, collection, doc, getDoc, updateDoc, deleteDoc, getDocs } from "firebase/firestore";
import db from "../firebase";

const temp = {
    Uid: String(""),
    ChucVu: String(""),
    Email: String(""),
    SoDienThoai: String(""),
    TenNhanVien: String("")
}

const StaffRef = collection(db, "NhanVien")

function NhanVienDataService() {
    
    const addNhanVien = async (newStaff) => {
      return await addDoc(StaffRef, newStaff);
    };

    const updateNhanVien = async (id, updateStaff) => {
      const docStaff = doc(db, "NhanVien", id);
      return await updateDoc(docStaff, updateStaff);
    };

    const deleteNhanVien = async (id) => {
      const staffDoc = doc(db, "NhanVien", id);
      return await deleteDoc(staffDoc);
    };

    const getAllNhanVien = async () => {
      return await getDocs(StaffRef);
    };

    const getNhanVien = async (id) => {
      const staffDoc = doc(db, "NhanVien", id);
      return await getDoc(staffDoc);
    };

    return {
        addNhanVien,
        updateNhanVien,
        deleteNhanVien,
        getAllNhanVien,
        getNhanVien
    }
}

export default new NhanVienDataService();