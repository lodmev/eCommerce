import { CustomerDraft } from '@commercetools/platform-sdk';

export type Writable<T> = { -readonly [P in keyof T]: T[P] };
export type RegisterCustomerDraft = Writable<
  CustomerDraft & Required<Pick<CustomerDraft, 'password' | 'addresses'>>
>;