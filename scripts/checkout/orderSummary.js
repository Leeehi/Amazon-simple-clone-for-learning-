import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { product, getItems } from '../../data/products.js';
import { priceDisplay } from '../util/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { calculateDeliveryDate, deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import { renderCheckout } from './renderCheckoutHeader.js';

export function renderOrderSummary() {

  let cartInnerHTML = '';

  cart.forEach( (cartItem) => {

    const matchingItem = getItems(cartItem.productId);

    const deliveryOptionId = cartItem.deliveryOption;

    let deliveryOptionMatch = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOptionMatch);

    cartInnerHTML += 
    `
      <div class="js-cart-item-container cart-item-container js-cart-item-${matchingItem.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src=${matchingItem.image}>

                <div class="cart-item-details">
                  <div class="product-name js-product-name-${matchingItem.id}">
                    ${matchingItem.name}
                  </div>
                  <div class="product-price js-product-price-${matchingItem.id}">
                    $${priceDisplay(matchingItem.priceCents)}
                  </div>
                  <div class="product-quantity product-quantity-${matchingItem.id}">
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
                    <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingItem.id}" data-product-id="${matchingItem.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionHTML(matchingItem, cartItem)}
                </div>
              </div>
            </div>
    `
  })

  document.querySelector('.js-order-summary').innerHTML = cartInnerHTML;

  function deliveryOptionHTML(matchingItem, cartItem) {

    let optionsHTML = '';

    deliveryOptions.forEach( (options) => {

      // const today = dayjs();
      // const deliveryDay = today.add(options.deliveryDays, 'days');
      // const dateString = deliveryDay.format('dddd, MMMM D');

      const dateString = calculateDeliveryDate(options);

      const priceString = options.priceCents === 0 ? 'FREE': `$${priceDisplay(options.priceCents)}`

      const isChecked = options.id === cartItem.deliveryOption;

      optionsHTML +=`
        <div class="delivery-option js-delivery-option js-delivery-option-${matchingItem.id}-${options.id}" data-product-id="${matchingItem.id}" 
        data-delivery-option-id="${options.id}">
          <input type="radio"
          ${isChecked ? 'checked' : ''}
            class="delivery-option-input js-delivery-option-inpit-${matchingItem.id}-${options.id}"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>
      `
    });

    return optionsHTML;
  }

  function updateCartQuantity() {

    let cartQuantity = calculateCartQuantity();

      let withS = cartQuantity > 1 ? "items": "item";

      // document.querySelector('.js-return-to-home').innerHTML = `${cartQuantity} ${withS}`;
  }

  // updateCartQuantity();

  document.querySelectorAll(`.js-delete-link`).forEach ( (link) => {

    link.addEventListener('click', () => {

      let {productId} = link.dataset;

      removeFromCart(productId);

      // const product = document.querySelector(`.js-cart-item-${productId}`);

      // product.remove();

      updateCartQuantity();
      renderOrderSummary();
      renderPaymentSummary();
      renderCheckout();
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
      renderPaymentSummary();
      renderCheckout();
    })

    quantityInput.addEventListener('keydown', (event) => {

      if (event.key === 'Enter') {

        let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value)
    
        let updatedQuantity = updateQuantity(productId, newQuantity);

        let displayer = document.querySelector(`.js-cart-item-${productId}`);

        displayer.classList.remove('is-editing-quantity');

        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = updatedQuantity;

        updateCartQuantity();
        renderPaymentSummary();
        renderCheckout();
      }
    })
  })

  document.querySelectorAll('.js-delivery-option').forEach( (link) => {

    link.addEventListener('click', () => {

      let { productId, deliveryOptionId } = link.dataset;

      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
}