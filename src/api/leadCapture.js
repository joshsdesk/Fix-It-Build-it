import { db } from "../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export const captureLead = async (leadData) => {
    try {
        const docRef = await addDoc(collection(db, "leads"), {
            ...leadData,
            createdAt: serverTimestamp(),
            status: "new",
            notes: "Auto-captured via Estimator",
        });
        console.log("Lead captured with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { success: false, error: e };
    }
};
