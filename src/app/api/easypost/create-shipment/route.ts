import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const apiKey = process.env.EASYPOST_API_KEY!;
  const auth = Buffer.from(`${apiKey}:`).toString("base64");

  const shipmentRes = await fetch("https://api.easypost.com/v2/shipments", {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shipment: {
        to_address: body.toAddress,
        from_address: body.fromAddress,
        parcel: body.parcel,
      },
    }),
  });

  const shipment = await shipmentRes.json();
  return NextResponse.json(shipment);
}
