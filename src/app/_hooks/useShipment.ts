import { useState } from "react";
import { createShipment } from "../services";
import { IAddress, IParcel, IShipmentResponse } from "../_interfaces/shipment";

export const useShipment = () => {
  const [shipmentDetails, setShipmntDetails] = useState<IShipmentResponse>();

  const fetchCreate = async (
    toAddress: IAddress,
    fromAddress: IAddress,
    parcel: IParcel
  ) => {
    const response = await createShipment(toAddress, fromAddress, parcel);

    setShipmntDetails(response);
  };

  return {
    shipmentDetails,
    fetchCreate,
  };
};
