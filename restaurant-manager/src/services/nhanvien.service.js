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

class NhanVienDataService {
    
    addNhanVien = async (newStaff) => {
        return await addDoc(StaffRef, newStaff)
    }

    updateNhanVien = async (id, updateStaff) => {
        const docStaff = doc(db, "NhanVien", id);
        return await updateDoc(docStaff, updateStaff);
    }

    deleteNhanVien = async (id) => {
        const staffDoc = doc(db, "NhanVien", id);
        return await deleteDoc(staffDoc);
    }

    getAllNhanVien = async () => {
        return await getDocs(StaffRef);
    }

    getNhanVien = async (id) => {
        const staffDoc = doc(db, "NhanVien", id);
        return await getDoc(staffDoc)
    }
}

export default new NhanVienDataService();