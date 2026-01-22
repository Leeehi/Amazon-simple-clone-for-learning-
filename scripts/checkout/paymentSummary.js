import { cart } from "../../data/cart-class.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrders } from "../../data/order.js";
import { getItems } from "../../data/products.js";
import { priceDisplay } from "../util/money.js";

export function renderPaymentSummary() {

  let productPriceCents = 0;
  let deliveryOption = 0;

  cart.cartItems.forEach((cartItem) => {
    const product = getItems(cartItem.productId)
    const delivery = getDeliveryOption(cartItem.deliveryOption);
    productPriceCents += product.priceCents * cartItem.quantity;
    deliveryOption += delivery.priceCents;
  })

  const totalBeforeTaxCents = productPriceCents + deliveryOption;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  let summaryDisplay = 
  `<div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>${updateCartQuantity()}:</div>
          <div class="payment-summary-money">$${priceDisplay(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money js-payment-summary-money">$${priceDisplay(deliveryOption)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${priceDisplay(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${priceDisplay(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row js-total-row">
          <div>Order total:</div>
          <div class="payment-summary-money js-payment-summary-money-total">$${priceDisplay(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order">
          Place your order
        </button>`;

  document.querySelector('.js-payment-summary').innerHTML = summaryDisplay;

  function updateCartQuantity() {
  
      let cartQuantity = cart.calculateCartQuantity();
  
        // let withS = cartQuantity > 1 ? "items": "item";
  
        return `Items (${cartQuantity})`;
    }

  document.querySelector('.js-place-order').addEventListener( 'click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: cart.cartItems
      })
      });

      const order = await response.json();
      // console.log(order);
      addOrders(order);
      cart.afterOrderItems();

    } catch (error) {
      console.log('Unexpected error, try again later');
    }

    window.location.href = 'orders.html';
  });

}