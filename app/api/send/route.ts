import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/components/firebase/config";

export async function GET(request: Request) {
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

export async function POST(request: Request) {
  const formData = await request.json();
  const { personEmail, personName, phoneNumber, foodName, address } = formData;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Rahul Gupta <rahulGupta@rahulguptadev.in>",
        to: ["pctesanjanabca21b@gmail.com", "rg5353070@gmail.com"],
        subject: "the request was send from sanjana contact form",
        html: `<strong>it works!</strong>
          <ul>
            <li>from frontend</li>
            <li>${personName}</li>
            <li>${personEmail}</li>
            <li>${foodName}</li>
            <li>${phoneNumber}</li>
            <li>${address}</li>
          </ul>
        `,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.log(error);
  }
}
