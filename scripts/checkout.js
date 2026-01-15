import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckout } from './checkout/renderCheckoutHeader.js'
import { loadProducts } from '../data/products.js';
// import '../data/cart-class.js';
// import { cars } from '../data/car.js';
//import '../data/backend-practice.js'

loadProducts( () => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckout();
})