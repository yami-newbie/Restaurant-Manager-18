import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from "firebase/firestore"
import db from "../firebase"


const ColorRef = collection(db, "colors");

class ColorDataService {
    addColor = (newColor) => {
        return addDoc(ColorRef, newColor);
    }

    updateColor = (id, color) => {
        const colorDoc = doc(db, "colors", id);
        return updateDoc(colorDoc, color)
    }

    deleteColor = (id) => {
        const colorDoc = doc(db, "colors", id);
        return deleteDoc(colorDoc)
    }

    getAllColor = () => {
        return getDocs(ColorRef);
    }

    getColor = (id) => {
        const colorDoc = doc(db, "colors", id);
        return getDoc(colorDoc);
    }
}

export default new ColorDataService();