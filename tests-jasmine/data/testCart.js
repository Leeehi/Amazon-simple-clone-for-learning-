import { updateCart, cart, loadFromStorage } from '../../data/cart.js'

describe('test suite: updateCart', () => {
  it('adds a quantity if its already existing', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake( () => {
      return JSON.stringify([{
        productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
        quantity: 1,
        deliveryOption: '1'
      }]);
    });
    loadFromStorage();

    updateCart('dd82ca78-a18b-4e2a-9250-31e67412f98d', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('dd82ca78-a18b-4e2a-9250-31e67412f98d');
    expect(cart[0].quantity).toEqual(2);
  });

  it('adds a new item to the cart', () => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake( () => {
      return JSON.stringify([]);
    });
    loadFromStorage();

    updateCart('dd82ca78-a18b-4e2a-9250-31e67412f98d', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('dd82ca78-a18b-4e2a-9250-31e67412f98d');
    expect(cart[0].quantity).toEqual(1);
  })

});