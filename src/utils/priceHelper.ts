import { type Price } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/common';

const priceToString = ({
  centAmount,
  fractionDigits,
}: {
  centAmount: number;
  fractionDigits: number;
}) => (centAmount / 10 ** fractionDigits).toFixed(fractionDigits);

export class PriceHelper {
  private defaultStringValue = '?';

  private value?: Price['value'];

  private discounted?: Price['discounted'];

  #currency = '';

  constructor({ price }: { price?: Partial<Price> }) {
    if (price?.value) {
      this.value = price.value;
      this.#currency = price.value.currencyCode;
    }
    if (price?.discounted) {
      this.discounted = price.discounted;
    }
  }

  get currency() {
    return this.#currency;
  }

  get priceValue(): string {
    if (this.value) {
      return priceToString(this.value);
    }
    return this.defaultStringValue;
  }

  get finalPriceValue(): string {
    if (this.value) {
      if (this.discounted) {
        return priceToString(this.discounted.value);
      }
      return this.priceValue;
    }
    return this.defaultStringValue;
  }

  get discountValue(): string {
    if (this.discounted && this.value) {
      return ((1 - this.discounted.value.centAmount / this.value.centAmount) * 100).toFixed(0);
    }
    return this.defaultStringValue;
  }

  get hasPrice(): boolean {
    return Boolean(this.value);
  }

  get hasDiscount(): boolean {
    return Boolean(this.value && this.discounted);
  }
}

export default PriceHelper;
