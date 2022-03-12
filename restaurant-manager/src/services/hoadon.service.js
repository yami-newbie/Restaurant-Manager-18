import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import db from "../firebase";


const temp = {
    LoaiTiec: String(""),
    MaGiamGia: String(""),
    NhanVien: String(""),
    TenKhachHang: String(""),
    ThoiGian: Timestamp(),
    TongGia: Number(),
}

const HoaDonRef = collection(db, "HoaDon");

class HoaDonDataService {
    addHoaDon = async (newHoaDon) => {
        return await addDoc(HoaDonRef, newHoaDon);
    }

    updateHoaDon = async (id, updateHoaDon) => {
        const hoadonDoc = doc(db, "HoaDon", id);
        return await updateDoc(hoadonDoc, updateHoaDon);
    }

    deleteHoaDon = async (id) => {
        const hoadonDoc = doc(db, "HoaDon", id);
        return await deleteDoc(hoadonDoc);
    }

    getAllHoaDon = async () => {
        return await getDocs(HoaDonRef);
    }

    getHoaDon = async (id) => {
        const hoadonDoc = doc(db, "HoaDon", id);
        return await getDoc(hoadonDoc);
    }
}

export default new HoaDonDataService();