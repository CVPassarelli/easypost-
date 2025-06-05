export interface IShipmentResponse {
  id: string;
  created_at: string;
  updated_at: string;
  is_return: boolean;
  mode: string;
  status: string;
  tracking_code: string | null;
  messages: any[];
  options: {
    currency: string;
    payment: {
      type: string;
    };
    date_advance: number;
  };
  reference: string | null;
  batch_id: string | null;
  batch_status: string | null;
  batch_message: string | null;
  customs_info: any | null;
  insurance: string | null;
  order_id: string | null;
  postage_label: any | null;
  rates: Rate[];
  refund_status: string | null;
  scan_form: any | null;
  selected_rate: Rate | null;
  tracker: any | null;
  to_address: Address;
  from_address: Address;
  return_address: Address;
  buyer_address: Address;
  parcel: Parcel;
  usps_zone: number;
  forms: any[];
  fees: any[];
  object: string;
}

export interface Rate {
  id: string;
  object: "Rate";
  created_at: string;
  updated_at: string;
  mode: string;
  service: string;
  carrier: string;
  rate: string;
  currency: string;
  retail_rate: string | null;
  retail_currency: string | null;
  list_rate: string;
  list_currency: string;
  billing_type: string;
  delivery_days: number;
  delivery_date: string | null;
  delivery_date_guaranteed: boolean;
  est_delivery_days: number;
  shipment_id: string;
  carrier_account_id: string;
}

export interface Address {
  id: string;
  object: "Address";
  created_at: string;
  updated_at: string;
  name: string;
  company: string | null;
  street1: string;
  street2: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  mode: string;
  carrier_facility: string | null;
  residential: boolean | null;
  federal_tax_id: string | null;
  state_tax_id: string | null;
  verifications: object;
}

export interface Parcel {
  id: string;
  object: "Parcel";
  created_at: string;
  updated_at: string;
  length: number;
  width: number;
  height: number;
  predefined_package: string | null;
  weight: number;
  mode: string;
}

export interface IAddress {
  name: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
}

export interface IParcel {
  length: number;
  width: number;
  height: number;
  weight: number;
}

export interface EasyPostLabelResponse {
  label_url: string;
  tracking_code: string;
  carrier: string;
  service: string;
}
