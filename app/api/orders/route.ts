import { NextResponse } from "next/server";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";

export async function POST(request: Request) {
  try {
    const newCityRef = doc(collection(db, "orders"));

    // later...
    await setDoc(newCityRef, {
      name: "orders",
    });

    return NextResponse.json({
      success: true,
      message: "Order added successfully!",
    });
  } catch (error) {
    console.error("Error adding Order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to add Order." },
      { status: 500 },
    );
  }
}
