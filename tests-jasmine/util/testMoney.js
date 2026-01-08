import { priceDisplay } from "../../scripts/util/money.js";

describe('test suite: priceDisplay', () => {
  it('convert cents to dollars', () => {
    expect(priceDisplay(2299)).toEqual('22.99');
  });

  it('is working wiht zero', () => {
    expect(priceDisplay(0)).toEqual('0.00');
  })

  it('rounds the number', () => {
    expect(priceDisplay(2299.5)).toEqual('23.00');
  })
});