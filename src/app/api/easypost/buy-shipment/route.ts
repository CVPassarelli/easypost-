import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { shipmentId, rateId } = await req.json();

    if (!shipmentId || !rateId) {
      return NextResponse.json(
        { error: "shipmentId e rateId são obrigatórios" },
        { status: 400 }
      );
    }

    const apiKey = process.env.EASYPOST_API_KEY!;
    const auth = Buffer.from(`${apiKey}:`).toString("base64");

    const buyRes = await fetch(
      `https://api.easypost.com/v2/shipments/${shipmentId}/buy`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rate: { id: rateId },
        }),
      }
    );

    if (!buyRes.ok) {
      const errorBody = await buyRes.text();
      console.error("Erro na compra:", errorBody);
      return new NextResponse("Erro ao comprar o frete", { status: 500 });
    }

    const bought = await buyRes.json();

    return NextResponse.json({
      label_url: bought.postage_label?.label_url,
      tracking_code: bought.tracking_code,
      carrier: bought.selected_rate?.carrier,
      service: bought.selected_rate?.service,
    });
  } catch (error: any) {
    console.error("Erro interno:", error);
    return new NextResponse("Erro interno do servidor", { status: 500 });
  }
}
