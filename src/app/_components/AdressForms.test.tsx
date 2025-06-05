import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddressForm from "./AddressForms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { addressSchema } from "../_schemas/adress.schema";
import { parcelSchema } from "../_schemas/parcel.schema";
import { z } from "zod";

const fullSchema = z.object({
  to: addressSchema,
  from: addressSchema,
  parcel: parcelSchema,
});

type FormData = z.infer<typeof fullSchema>;

const Wrapper = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const methods = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    defaultValues: {
      to: {
        name: "",
        street1: "",
        city: "",
        state: "",
        zip: "",
        country: "BR", // inválido
        phone: "",
        email: "",
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
        length: 10,
        width: 10,
        height: 10,
        weight: 10,
      },
    },
  });

  return (
    <FormProvider {...methods}>
      <AddressForm onSubmit={onSubmit} />
    </FormProvider>
  );
};
describe("AddressForm", () => {
  it("should render all To/From/Parcel fields", () => {
    render(<Wrapper onSubmit={() => {}} />);

    // To fields
    expect(screen.getByPlaceholderText("To name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("To street1")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("To city")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("To state")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("To zip")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("To country")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("To phone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("To email")).toBeInTheDocument();

    // From fields
    expect(screen.getByPlaceholderText("From name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("From street1")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("From city")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("From state")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("From zip")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("From country")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("From phone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("From email")).toBeInTheDocument();

    // Parcel fields
    expect(screen.getByPlaceholderText("Parcel length")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Parcel width")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Parcel height")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Parcel weight")).toBeInTheDocument();
  });

  it("should submit the form with valid data", async () => {
    const handleSubmit = jest.fn();
    render(<Wrapper onSubmit={handleSubmit} />);

    fireEvent.click(
      screen.getByRole("button", { name: /continue to parcel/i })
    );

    expect(await screen.findByText(/Continue to Parcel/i)).toBeInTheDocument();
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("should show validation error when country is not US", async () => {
    const handleSubmit = jest.fn();
    render(<Wrapper onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByPlaceholderText("To country"), {
      target: { value: "BR" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: /continue to parcel/i })
    );

    const error = await screen.findByText(/only us addresses allowed/i);
    expect(error).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
