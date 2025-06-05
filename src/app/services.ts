import { AddressFormData } from "./_schemas/adress.schema";
import { ParcelFormData } from "./_schemas/parcel.schema";

type BuyShipmentResponse = {
  label_url: string;
  tracking_code: string;
  carrier: string;
  service: string;
};

export async function createShipment(
  toAddress: AddressFormData,
  fromAddress: AddressFormData,
  parcel: ParcelFormData
) {
  const response = await fetch(`/api/easypost/create-shipment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      toAddress,
      fromAddress,
      parcel,
    }),
  });

  if (!response.ok)
    throw new Error("Error processing request. Please try again");
  return await response.json();
}

export async function buyShipment(
  shipmentId: string,
  rateId: string
): Promise<BuyShipmentResponse> {
  const res = await fetch("/api/easypost/buy-shipment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shipmentId, rateId }),
  });

  if (!res.ok) {
    throw new Error("Erro ao comprar o frete");
  }

  return await res.json();
}
