import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from '../data/cart.js';
import { product } from '../data/products.js';
import { priceDisplay } from './util/money.js';

let cartInnerHTML = '';

cart.forEach( (cartItem) => {

  let matchingItem;

  product.forEach( (products) => {

    if (cartItem.productId === products.id) {
      matchingItem = products;
    }
  })

  cartInnerHTML += 
  `
    <div class="cart-item-container js-cart-item-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingItem.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${priceDisplay(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity" data-product-id="${matchingItem.id}">
                    Update
                  </span>
                  <input class="quantity-input js-quantity-input-${matchingItem.id}">
                  <span class="save-quantity-link link-primary js-save-quantity" data-product-id="${matchingItem.id}">
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  `
})

document.querySelector('.js-order-summary').innerHTML = cartInnerHTML;

function updateCartQuantity() {

  let cartQuantity = calculateCartQuantity();

    let withS = cartQuantity > 1 ? "items": "item";

    document.querySelector('.js-return-to-home').innerHTML = `${cartQuantity} ${withS}`;
}

updateCartQuantity();

document.querySelectorAll(`.js-delete-link`).forEach ( (link) => {

  link.addEventListener('click', () => {

    let {productId} = link.dataset;

    removeFromCart(productId);

    const product = document.querySelector(`.js-cart-item-${productId}`);

    product.remove();

    updateCartQuantity();
  })
})

document.querySelectorAll('.js-update-quantity').forEach( (link) => {

  link.addEventListener('click', () => {

    let { productId } = link.dataset;

    let displayer = document.querySelector(`.js-cart-item-${productId}`)

    displayer.classList.add('is-editing-quantity');

  })
})

document.querySelectorAll('.js-save-quantity').forEach( (link) => {

  let { productId } = link.dataset;
  let quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
  
  link.addEventListener('click', () => {

    let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
  
    let updatedQuantity = updateQuantity(productId, newQuantity);

    let displayer = document.querySelector(`.js-cart-item-${productId}`);

    displayer.classList.remove('is-editing-quantity');

    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = updatedQuantity;

    updateCartQuantity();
  })

  quantityInput.addEventListener('keydown', (event) => {

    if (event.key === 'Enter') {

      let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
  
      let updatedQuantity = updateQuantity(productId, newQuantity);

      let displayer = document.querySelector(`.js-cart-item-${productId}`);

      displayer.classList.remove('is-editing-quantity');

      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = updatedQuantity;

      updateCartQuantity();
    }
  })
})