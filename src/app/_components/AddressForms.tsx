import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  addressSchema,
  type AddressFormData,
} from "@/app/_schemas/adress.schema";
import { ParcelFormData, parcelSchema } from "../_schemas/parcel.schema";

interface Props {
  onSubmit: (
    to: AddressFormData,
    from: AddressFormData,
    parcel: ParcelFormData
  ) => void;
}

const fullSchema = z.object({
  to: addressSchema,
  from: addressSchema,
  parcel: parcelSchema,
});

type FullFormData = z.infer<typeof fullSchema>;

export default function AddressForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FullFormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      to: {
        name: "Cliente Destino",
        street1: "388 Townsend St",
        city: "San Francisco",
        state: "CA",
        zip: "94107",
        country: "US",
        phone: "415-555-1234",
        email: "destino@example.com",
      },
      from: {
        name: "Loja Origem",
        street1: "417 Montgomery Street",
        city: "San Francisco",
        state: "CA",
        zip: "94104",
        country: "US",
        phone: "415-528-7555",
        email: "origem@example.com",
      },
      parcel: {
        length: 10.2,
        width: 7.8,
        height: 4.3,
        weight: 15.5,
      },
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) =>
        onSubmit(data.to, data.from, data.parcel)
      )}
      className=" py-10 border-2">
      <div className="container px-4 lg:px-0 mx-auto">
        <h2 className="text-2xl border-b border-white w-full text-center py-4 text-white">
          Label Parcel Details
        </h2>
        <div className="  w-full gap-x-5 grid lg:grid-cols-3">
          <div className="flex flex-col w-full">
            <h3 className="text-white mt-4 font-light">To Address</h3>
            <div className="flex flex-col gap-y-1 w-full">
              {Object.keys(addressSchema.shape).map((key) => (
                <div key={`to.${key}`}>
                  <input
                    placeholder={`To ${key}`}
                    {...register(`to.${key}` as const)}
                    className="rounded-sm px-2 py-1 my-1 block border-white border shadow-md w-full bg-[transparent] placeholder:text-slate-400 text-white"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.to?.[key as keyof AddressFormData]?.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-white mt-4 font-light">From Address</h3>{" "}
            <div className="flex flex-col gap-y-1">
              {Object.keys(addressSchema.shape).map((key) => (
                <div key={`from.${key}`}>
                  <input
                    placeholder={`From ${key}`}
                    {...register(`from.${key}` as const)}
                    className="rounded-sm px-2 py-1 my-1 block border-white border shadow-md w-full bg-[transparent] placeholder:text-slate-400 text-white"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.from?.[key as keyof AddressFormData]?.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-white mt-4 font-light">Parcel Info</h3>
            <div className="flex flex-col gap-y-1">
              {Object.keys(parcelSchema.shape).map((key) => (
                <div key={`parcel.${key}`}>
                  <input
                    type="number"
                    step="any"
                    placeholder={`Parcel ${key}`}
                    {...register(`parcel.${key}` as const, {
                      valueAsNumber: true,
                    })}
                    className="rounded-sm px-2 py-1 my-1 block border-white border shadow-md w-full bg-[transparent] placeholder:text-slate-400 text-white"
                  />
                  <p className="text-red-500 text-sm">
                    {errors.parcel?.[key as keyof ParcelFormData]?.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="cursor-pointer border-white border text-white px-4 py-2 mt-4 rounded hover:bg-white hover:text-[#164DFF] w-full lg:w-fit">
            Continue to Parcel
          </button>
        </div>
      </div>
    </form>
  );
}
