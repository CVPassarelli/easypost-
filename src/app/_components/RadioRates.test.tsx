import { fireEvent, render, screen } from "@testing-library/react";
import RadioRates from "./RadioRates";
import { Rate } from "../_interfaces/shipment";

const mockRates: Rate[] = [
  {
    id: "rate1",
    service: "Priority",
    carrier: "USPS",
    rate: "10.00",
    currency: "USD",
    object: "Rate",
    created_at: "",
    updated_at: "",
    mode: "",
    retail_rate: null,
    retail_currency: null,
    list_rate: "",
    list_currency: "",
    billing_type: "",
    delivery_days: 0,
    delivery_date: null,
    delivery_date_guaranteed: false,
    est_delivery_days: 0,
    shipment_id: "",
    carrier_account_id: "",
  },
  {
    id: "rate2",
    service: "Express",
    carrier: "FedEx",
    rate: "15.50",
    currency: "USD",
    object: "Rate",
    created_at: "",
    updated_at: "",
    mode: "",
    retail_rate: null,
    retail_currency: null,
    list_rate: "",
    list_currency: "",
    billing_type: "",
    delivery_days: 0,
    delivery_date: null,
    delivery_date_guaranteed: false,
    est_delivery_days: 0,
    shipment_id: "",
    carrier_account_id: "",
  },
];

describe("Radio Rates Component", () => {
  it("should render component", () => {
    render(<RadioRates rates={[]} onRateSelecte={jest.fn()} />);
    expect(screen.getByText(/Avaiable rates/)).toBeInTheDocument();
  });

  it("should render all rates passed as props", () => {
    render(<RadioRates rates={mockRates} onRateSelecte={jest.fn()} />);
    expect(screen.getByText(/USPS/i)).toBeInTheDocument();
    expect(screen.getByText(/Priority/i)).toBeInTheDocument();
  });

  it("should call onRateSelecte with the correct rate when clicked", () => {
    const mockSelect = jest.fn();
    render(<RadioRates rates={mockRates} onRateSelecte={mockSelect} />);

    const secondRateInput = screen.getByDisplayValue("rate2");
    fireEvent.click(secondRateInput);

    expect(mockSelect).toHaveBeenCalledWith("rate2");
  });

  it("should mark a rate as selected when clicked", () => {
    render(<RadioRates rates={mockRates} onRateSelecte={jest.fn()} />);

    const secondRateInput = screen.getByDisplayValue("rate2");
    fireEvent.click(secondRateInput);

    expect(secondRateInput).toBeChecked();
  });
});
