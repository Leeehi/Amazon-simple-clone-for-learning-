import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckout } from './checkout/renderCheckoutHeader.js'
import { loadProducts, loadProductsFetch } from '../data/products.js';
// import '../data/cart-class.js';
// import { cars } from '../data/car.js';
//import '../data/backend-practice.js'

Promise.all([
  loadProductsFetch()
]).then( (value) => {
  // console.log(value);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckout();
});

/*
loadProducts( () => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckout();
})
*/