import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const RESEND_API_KEY = process.env.RESEND_API_KEY;

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
