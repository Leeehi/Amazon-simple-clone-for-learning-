import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getItems } from "../../data/products.js";
import { priceDisplay } from "../util/money.js";

export function renderPaymentSummary() {

  let productPriceCents = 0;
  let deliveryOption = 0;

  cart.forEach((cartItem) => {
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
          <div>Items (3):</div>
          <div class="payment-summary-money">$${priceDisplay(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${priceDisplay(deliveryOption)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${priceDisplay(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${priceDisplay(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${priceDisplay(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>`;

  document.querySelector('.js-payment-summary').innerHTML = summaryDisplay;

}