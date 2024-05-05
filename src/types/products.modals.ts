export interface ILocalizedString {
  [key: string]: string;
}

export interface ICategoryReference {
  id: string;
  typeId: string;
}

export enum MoneyType {
  'centPrecision' = 'centPrecision',
  'highPrecision' = 'highPrecision',
}

export interface ITypedMoney {
  type: MoneyType;
  fractionDigits: number;
  centAmount: number;
  currencyCode: string;
}

export interface IPrice {
  id: string;
  value: ITypedMoney;
  validFrom: string;
  validUntil: string;
}

export interface IImage {
  dimensions: {
    h: number;
    w: number;
  };
  url: string;
  label: string;
}

export interface IAssets {
  id: string;
  sources: {
    url: string;
  }[];
  name: ILocalizedString;
}

export interface IProductVariant {
  id: number;
  sku: string;
  prices: IPrice[];
  attributes: { name: string }[];
  price: IPrice;
  images: IImage[];
  assets: IAssets[];
}

export interface IProductData {
  name: ILocalizedString;
  categories: ICategoryReference[];
  categoryOrderHints: { [key: string]: string; }
  description: ILocalizedString;
  slug: ILocalizedString;
  metaTitle: ILocalizedString;
  metaDescription: ILocalizedString;
  metaKeywords: ILocalizedString;
  masterVariant: IProductVariant;
  variants: IProductVariant[];
  searchKeywords: {
    [key: string]: {[key: string]: string}[];
  };
}

export interface IProductCatalogData {
  current: IProductData;
  hasStagedChanges: boolean;
  published: boolean;
  staged: IProductData;
}

export interface IProductsModals {
  id: string;
  version: number;
  masterData: IProductCatalogData;
}

