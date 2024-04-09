import { NextResponse } from "next/server";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// Add a new document with a generated id.

export async function POST(request: Request) {
  try {
    const newOrder = await request.json(); // Parse incoming order data

    const docRef = await addDoc(collection(db, "orders"), newOrder);
    console.log("Document written with ID: ", docRef.id);

    return NextResponse.json({
      success: true,
      message: "Order created successfully!",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order." },
      { status: 500 },
    );
  }
}
