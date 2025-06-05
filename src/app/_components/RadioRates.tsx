import { useState } from "react";
import { Rate } from "../_interfaces/shipment";

interface Props {
  onRateSelecte: (rate: string) => void;
  rates: Rate[];
}

export default function RadioRates({ onRateSelecte, rates }: Props) {
  const [selectedRate, setelectedRate] = useState<String>("");
  const handleRateSelect = (rate: string) => {
    setelectedRate(rate);
    onRateSelecte(rate);
  };
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl border-b border-[#164DFF] w-full text-center py-4 text-[#164DFF]">
        Avaiable rates
      </h2>
      <div className="grid grid-cols-4 gap-2 mt-4">
        {rates.map((rate) => (
          <label htmlFor={rate.id} key={rate.id} className="cursor-pointer">
            <input
              type="radio"
              name="rate"
              id={rate.id}
              value={rate.id}
              className="peer hidden"
              onChange={() => handleRateSelect(rate.id)}
              checked={selectedRate === rate.id}
            />
            <div className="peer-checked:border-blue-500 border-2 border-slate-200 p-2 rounded">
              <p>
                <strong>{rate.carrier}</strong> - {rate.service}
              </p>
              <p>
                {rate.currency} {rate.rate}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
