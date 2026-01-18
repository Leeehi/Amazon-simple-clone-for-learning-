import { deliveryOptions } from './deliveryOptions.js';

export let cart;

loadFromStorage();

export async function loadCartFetch() {
  const promise = await fetch('https://supersimplebackend.dev/cart');
  const response = await promise.text();
  console.log(response);
}

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
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

function saveToLocal() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function calculateCartQuantity() {

  let cartQuantity = 0;

    cart.forEach( (item) => {
      cartQuantity += item.quantity;
    })

    return cartQuantity;
}

export function updateCart(productId, quantity) {

  let matchingItem;
    
    cart.forEach( (item) => {

      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity,
        deliveryOption: '1'
      });
    };

    saveToLocal();
}

export function removeFromCart(productId) {

  let newCart = [];

  cart.forEach( (cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })

  cart = newCart;

  saveToLocal();
}

export function updateQuantity(productId, newQuantity) {

  let matchingItem;

  cart.forEach( (cartItem) => {

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

  return matchingItem.quantity;

  saveToLocal();
}

export function updateDeliveryOption(productId, productDeliveryId) {
  
  let matchingItem, matchedId;

  deliveryOptions.forEach( (option) => {
    
    if(productDeliveryId === option.id) {
      matchedId = option.id
    }
  })

  if(!matchedId) {
    return;
  }

  cart.forEach( (cartItem) => {

    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  })

  if(!matchingItem) {
    return;
  }

  matchingItem.deliveryOption = productDeliveryId;

  saveToLocal();
}