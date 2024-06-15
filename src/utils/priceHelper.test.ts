import { describe, expect, it } from 'vitest';
import { PriceHelper } from './priceHelper';

describe('Testing class PriceHelper', () => {
  describe('undefined params in constructor', () => {
    const ph = new PriceHelper({ price: undefined });
    it('default values is "?"', () => {
      expect(ph.priceValue).toEqual('?');
      expect(ph.finalPriceValue).toEqual('?');
      expect(ph.discountValue).toEqual('?');
    });
    it('hasPrice and hasDiscount is false', () => {
      expect(ph.hasPrice).toBe(false);
      expect(ph.hasPrice).toBe(false);
    });
  });
  describe('with defined price value in constructor', () => {
    const ph = new PriceHelper({
      price: {
        value: {
          currencyCode: 'EUR',
          centAmount: 15315,
          fractionDigits: 2,
          type: 'centPrecision',
        },
        discounted: {
          value: {
            currencyCode: 'EUR',
            centAmount: 13513,
            fractionDigits: 2,
            type: 'centPrecision',
          },
          discount: {
            id: '1',
            typeId: 'product-discount',
          },
        },
      },
    });
    it('correct price value', () => {
      expect(ph.priceValue).toEqual('153.15');
      expect(ph.finalPriceValue).toEqual('135.13');
    });
    it('correct duscount value', () => {
      expect(ph.discountValue).toEqual('12');
    });
    it('hasPrice and hasDiscount is true', () => {
      expect(ph.hasPrice).toBe(true);
      expect(ph.hasPrice).toBe(true);
    });
  });
});
