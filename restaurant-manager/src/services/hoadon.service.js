import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase";

const context = createContext();

export const useOrderService = () => {
  return useContext(context);
};

export default function ProviderOrderService({ children }) {
  const value = HoaDonDataService();
  return <context.Provider value={value}>{children}</context.Provider>;
}

const HoaDonRef = collection(db, "HoaDon");

function HoaDonDataService() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(HoaDonRef, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
    orders,
    addHoaDon,
    updateHoaDon,
    deleteHoaDon,
    getAllHoaDon,
    getHoaDon,
  };
}