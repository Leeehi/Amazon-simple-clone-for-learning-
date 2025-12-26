export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}];
}

function saveToLocal() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateCart(productId) {

  let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    
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
        quantity
      });
    };

    saveToLocal();
}

export function deleteFunction(primaryId) {

  let newCart = [];

  cart.forEach( (cartItem) => {

    if(cartItem.productId !== primaryId) {
      newCart.push(cartItem);
    }
  })

  cart = newCart;
  saveToLocal();
}

export function calculateCartQuantity() {

  let cartCount = 0;

  cart.forEach( (cartItem) => {
    cartCount += cartItem.quantity;
  })

  return cartCount;
}

export function updateQuantity(productId, newQuantity) {

  let matchingItem;

  cart.forEach( (cartItem) => {

    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  })

  if (newQuantity > 0 && newQuantity <= 1000) {
    matchingItem.quantity = newQuantity;
  } else {
    window.alert(`You cant add that value`);
    return;
  }

  saveToLocal();
}