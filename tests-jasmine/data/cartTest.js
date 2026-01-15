import { cart } from '../../data/cart-class.js'

describe('test suite: updateCart', () => {

  beforeEach( () => {
    spyOn(localStorage, 'setItem');
  })

  it('adds a quantity if its already existing', () => {

    cart.cartItems = [{
      productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
      quantity: 1,
      deliveryOption: '1'
    }];

    cart.updateCart('dd82ca78-a18b-4e2a-9250-31e67412f98d', 1);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('dd82ca78-a18b-4e2a-9250-31e67412f98d');
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
        quantity: 2,
        deliveryOption: '1'
      }]));
  });

  it('adds a new item to the cart', () => {

    cart.cartItems = [];

    cart.updateCart('dd82ca78-a18b-4e2a-9250-31e67412f98d', 1);
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('dd82ca78-a18b-4e2a-9250-31e67412f98d');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
        quantity: 1,
        deliveryOption: '1'
      }]));
  })

  it('removes an id that is in the cart', () => {

    cart.cartItems = [{
        productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
        quantity: 2,
        deliveryOption: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOption: '2'
      }];

    cart.removeFromCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
        quantity: 2,
        deliveryOption: '1'
      }]));
  })

  it('removes an id that is not existing', () => {

    cart.cartItems = [{
        productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
        quantity: 2,
        deliveryOption: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOption: '2'
      }];

    cart.removeFromCart('dd82ca78-a18b-4e2a-9250-31e67412f9');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
        quantity: 2,
        deliveryOption: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOption: '2'
      }]))
  })
});

describe('test suite: updateDeliveryOption', () => {

  beforeEach( () => {
    spyOn(localStorage, 'setItem'),

    cart.cartItems = [{
        productId: 'dd82ca78-a18b-4e2a-9250-31e67412f98d',
        quantity: 2,
        deliveryOption: '1'
      },
      {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOption: '2'
      }];
  })

  it('updates the  delivery option of a product in the cart', () => {

    cart.updateDeliveryOption('dd82ca78-a18b-4e2a-9250-31e67412f98d', '3');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].deliveryOption).toEqual('3');
  })

  it('updates the delivery option of a product that is not in the cart', () => {
    
    cart.updateDeliveryOption('dd82ca78-a18b-4e2a-9250-31e67412f99e', '2');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })

  it('uses an delivery option that does not exist', () => {

    cart.updateDeliveryOption('dd82ca78-a18b-4e2a-9250-31e67412f98d', '4');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })
})