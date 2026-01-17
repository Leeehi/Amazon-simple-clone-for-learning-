import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckout } from './checkout/renderCheckoutHeader.js'
import { loadProducts, loadProductsFetch } from '../data/products.js';
// import '../data/cart-class.js';
// import { cars } from '../data/car.js';
//import '../data/backend-practice.js'

async function loadPage() {
  try {
    await loadProductsFetch();
    
  } catch (error) {
    console.log('Unexpected error, try again later');
  }

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckout();
}

loadPage();

/*
Promise.all([
  loadProductsFetch()
]).then( (value) => {
  // console.log(value);
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckout();
});
*/

/*
loadProducts( () => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckout();
})
*/