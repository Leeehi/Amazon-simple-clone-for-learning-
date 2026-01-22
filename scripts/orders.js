import { orders } from "../data/order.js";
import { loadProductsFetch, getItems } from "../data/products.js";
import { priceDisplay } from "./util/money.js";
import { cart } from "../data/cart-class.js";


async function loadPages() {
  await loadProductsFetch();

  renderOrderPage();
}

loadPages();

function renderOrderPage() {

  let orderHTML = '';

  orders.forEach( (order) => {

    const date = new Date(order.orderTime);
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    orderHTML += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${formattedDate}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${priceDisplay(order.totalCostCents)}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid">
        ${displayProduct(order, order.id)}
      </div>
    </div>
    `
  })
  document.querySelector('.js-orders-grid').innerHTML = orderHTML;

  function displayProduct(order, orderId) {

    let productDisplay = '';

    order.products.forEach( (product) => {

      let matchingItem = getItems(product.productId);

      // console.log(product.productId);
      // console.log(matchingItem.image);

      // console.log(matchingItem.id);

      const date = new Date(product.estimatedDeliveryTime);
      const options = { month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);

      productDisplay += `
        <div class="product-image-container">
          <img src=${matchingItem.image}>
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formattedDate}
          </div>
          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message js-buy-again" data-product-id="${matchingItem.id}" data-product-quantity="${product.quantity}">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${orderId}&productId=${matchingItem.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `
    })

    return productDisplay;
  }

  const cartCount = cart.calculateCartQuantity();

  document.querySelector('.js-cart-quantity').innerHTML = cartCount;

  document.querySelectorAll('.js-buy-again').forEach( (link) => {

    link.addEventListener( 'click', () => {

      let { productId, productQuantity } = link.dataset;

      cart.updateCart(productId, Number(productQuantity));

      window.location.href = 'checkout.html';
    })
  })
}

// renderOrderPage();