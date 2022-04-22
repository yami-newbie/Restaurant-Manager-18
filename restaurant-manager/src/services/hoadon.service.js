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

function HoaDonDataService() {
    const addHoaDon = async (newHoaDon) => {
      return await addDoc(HoaDonRef, newHoaDon);
    };

    const updateHoaDon = async (id, updateHoaDon) => {
      const hoadonDoc = doc(db, "HoaDon", id);
      return await updateDoc(hoadonDoc, updateHoaDon);
    };

    const deleteHoaDon = async (id) => {
      const hoadonDoc = doc(db, "HoaDon", id);
      return await deleteDoc(hoadonDoc);
    };

    const getAllHoaDon = async () => {
      return await getDocs(HoaDonRef);
    };

    const getHoaDon = async (id) => {
      const hoadonDoc = doc(db, "HoaDon", id);
      return await getDoc(hoadonDoc);
    };

    return {
        addHoaDon,
        updateHoaDon,
        deleteHoaDon,
        getAllHoaDon,
        getHoaDon
    }
}

export default new HoaDonDataService();