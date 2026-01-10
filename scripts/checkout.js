import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckout } from './checkout/renderCheckoutHeader.js'
import '../data/cart-oop.js';

renderOrderSummary();
renderPaymentSummary();
renderCheckout();