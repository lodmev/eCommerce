export default interface IValidatePostalCode {
  [key: string]: (code: string) => boolean;
}

export interface ICustomerRegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: {
    streetName: string;
    city: string;
    country: string;
    postalCode: string;
  }[];
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
}
