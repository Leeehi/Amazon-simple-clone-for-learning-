import { deliveryOptions } from './deliveryOptions.js';

class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOption: '1'
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOption: '2'
    }];
    }
  }

  saveToLocal() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  }

  calculateCartQuantity() {

    let cartQuantity = 0;

      this.cartItems.forEach( (item) => {
        cartQuantity += item.quantity;
      })

      return cartQuantity;
  }

  updateCart(productId, quantity) {

    let matchingItem;
      
      this.cartItems.forEach( (item) => {

        if (productId === item.productId) {
          matchingItem = item;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({
          productId,
          quantity,
          deliveryOption: '1'
        });
      };

      this.saveToLocal();
  }

  removeFromCart(productId) {

    let newCart = [];

    this.cartItems.forEach( (cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    })

    this.cartItems = newCart;

    this.saveToLocal();
  }

  updateQuantity(productId, newQuantity) {

    let matchingItem;

    this.cartItems.forEach( (cartItem) => {

      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    })

    if (matchingItem) {
      if (newQuantity > 0 && newQuantity <= 1000) {
        matchingItem.quantity = newQuantity;
      } else {
        window.alert("You cant change quantity to 0");
      }
    }

    this.saveToLocal();

    return matchingItem.quantity;
  }

  updateDeliveryOption(productId, productDeliveryId) {
  
    let matchingItem, matchedId;

    deliveryOptions.forEach( (option) => {
      
      if(productDeliveryId === option.id) {
        matchedId = option.id
      }
    })

    if(!matchedId) {
      return;
    }

    this.cartItems.forEach( (cartItem) => {

      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    })

    if(!matchingItem) {
      return;
    }

    matchingItem.deliveryOption = productDeliveryId;

    this.saveToLocal();
  }
}

const cart = new Cart('cart');
const businessCart = new Cart('business');

businessCart.updateCart('77919bbe-0e56-475b-adde-4f24dfed3a04', 5);

console.log(cart);
console.log(businessCart);