import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";

export const AddOrderToCart = async () => {
  try {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "orders"), {
      name: "Tokyo",
      country: "Japan",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log("error writing to document");
    console.log(error);
  }
};
