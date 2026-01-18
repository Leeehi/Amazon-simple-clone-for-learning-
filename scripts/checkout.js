import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckout } from './checkout/renderCheckoutHeader.js'
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCartFetch } from '../data/cart.js';
// import '../data/cart-class.js';
// import { cars } from '../data/car.js';
//import '../data/backend-practice.js'

async function loadPage() {
  try {
    // await loadProductsFetch();

    await Promise.all([
      loadCartFetch(),
      loadProductsFetch()
    ])

    renderOrderSummary();
    renderPaymentSummary();
    renderCheckout();
    
  } catch (error) {
    console.log('Unexpected error, try again later');
  }

  // loadCartFetch();
  // renderOrderSummary();
  // renderPaymentSummary();
  // renderCheckout();
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