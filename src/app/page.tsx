"use client";

import { useEffect, useState } from "react";
import { buyShipment, createShipment } from "./services";
import { useShipment } from "./_hooks/useShipment";
import AddressForm from "./_components/AddressForms";
import { AddressFormData } from "./_schemas/adress.schema";
import RadioRates from "./_components/RadioRates";
import { ParcelFormData } from "./_schemas/parcel.schema";
import { Modal } from "./_components/Modal";
import { useModal } from "./_hooks/useModal";
import { EasyPostLabelResponse } from "./_interfaces/shipment";
import { printLabel } from "./_utils/untils";
import { useLoader } from "./_context/LoaderContext";

export default function Home() {
  const { isOpen, open, close } = useModal();
  const [label, setLabel] = useState<EasyPostLabelResponse>();
  const [rate, setRate] = useState<string>("");
  const { loading, setLoading } = useLoader();

  const handlebuyShipment = async () => {
    setLoading(true);
    try {
      const responseLabel = await buyShipment(shipmentDetails!.id, rate);
      setLabel(responseLabel);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const { shipmentDetails, fetchCreate } = useShipment();

  const handleSubmit = (
    to: AddressFormData,
    from: AddressFormData,
    parcel: ParcelFormData
  ) => {
    setLoading(true);
    try {
      fetchCreate(to, from, parcel);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnSelectRate = (rate: string) => {
    setRate(rate);
  };

  return (
    <>
      <div className=" bg-[#164DFF] w-full">
        <AddressForm onSubmit={handleSubmit} />
      </div>
      <RadioRates
        rates={shipmentDetails?.rates ?? []}
        onRateSelecte={handleOnSelectRate}
      />
      <div className="flex w-full justify-center my-10 gap-4">
        <button
          disabled={rate === ""}
          onClick={handlebuyShipment}
          className="cursor-pointer border-[#164DFF] border text-[#164DFF] px-4 py-2 mt-4 rounded hover:bg-[#164DFF] hover:text-white w-full lg:w-fit disabled:cursor-not-allowed">
          Generate Label
        </button>
        <button
          onClick={open}
          disabled={!label}
          className="cursor-pointer border-[#164DFF] border text-[#164DFF] px-4 py-2 mt-4 rounded hover:bg-[#164DFF] hover:text-white w-full lg:w-fit disabled:cursor-not-allowed">
          Show Label
        </button>
      </div>

      <Modal
        isOpen={isOpen}
        onClose={close}
        children={
          <>
            <div className="flex justify-center">
              <img
                src={label?.label_url}
                alt={label?.service}
                className="object-contain lg:max-w-[500px]"
              />
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => printLabel(label!.label_url)}
                className="cursor-pointer border-[#164DFF] border text-[#164DFF] px-4 py-2 mt-4 rounded hover:bg-[#164DFF] hover:text-white w-full lg:w-fit disabled:cursor-not-allowed">
                Print
              </button>
            </div>
          </>
        }></Modal>
    </>
  );
}
