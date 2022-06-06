import {
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase";

const temp = {
  Gia: Number(0),
  SoLuong: Number(0),
  IDHoaDon: String(""),
  IDThucAn: String(""),
};

const context = createContext();

export const useCT_OrderService = () => {
  return useContext(context);
};

export default function ProviderCTOrderService({ children }) {
  const value = CT_HoaDonDataService();
  return <context.Provider value={value}>{children}</context.Provider>;
}

const CT_HoaDonRef = collection(db, "CT_HoaDon");

function CT_HoaDonDataService() {

  const [ct_orders, setCt_Orders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(CT_HoaDonRef, (snapshot) => {
      setCt_Orders(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addCT_HoaDon = async (newCT_HoaDon) => {
    return await addDoc(CT_HoaDonRef, newCT_HoaDon);
  };

  const getCT_HoaDonByIdHoaDon = (id) => {
    // console.log(ct_orders)
    return ct_orders.filter((ct) => ct.data.IDHoaDon === id);
  }

  const updateCT_HoaDon = async (id, updateCT_HoaDon) => {
    const docCT_HoaDon = doc(db, "CT_HoaDon", id);
    return await updateDoc(docCT_HoaDon, updateCT_HoaDon);
  };

  const deleteCT_HoaDon = async (id) => {
    const CT_HoaDonDoc = doc(db, "CT_HoaDon", id);
    return await deleteDoc(CT_HoaDonDoc);
  };

  const deleteCT_HoaDonByIdHoaDon = async (idHoaDon) => {
    const listCt = getCT_HoaDonByIdHoaDon(idHoaDon);

    if(listCt.length > 0) {
      listCt.map(ct => deleteCT_HoaDon(ct.id));
    }

  }

  const getAllCT_HoaDon = async () => {
    return await getDocs(CT_HoaDonRef);
  };

  const getCT_HoaDon = async (id) => {
    const CT_HoaDonDoc = doc(db, "CT_HoaDon", id);
    return await getDoc(CT_HoaDonDoc);
  };

  return {
    ct_orders,
    addCT_HoaDon,
    updateCT_HoaDon,
    deleteCT_HoaDon,
    getAllCT_HoaDon,
    getCT_HoaDon,
    getCT_HoaDonByIdHoaDon,
    deleteCT_HoaDonByIdHoaDon,
  };
}
