import { getOrder, getOrderItem, orders } from "../data/order.js";
import { getItems, loadProductsFetch } from "../data/products.js";

async function loadPages() {
  await loadProductsFetch();

  trackingRender();
}

loadPages();

function trackingRender() {
  
  const url = new URL(window.location.href);
  // console.log(url.searchParams.get('orderId'));
  // console.log(url.searchParams.get('productId'));

  let orderId = url.searchParams.get('orderId');
  let itemId = url.searchParams.get('productId');

  let orderIds = getOrder(orderId);
  let orderItem = getOrderItem(orderId, itemId);
  let order = getItems(itemId);

  const date = new Date(orderItem.estimatedDeliveryTime);
  const option = {weekday: 'long', month: 'long', day: 'numeric'}
  const formatted = date.toLocaleDateString('en-US', option);

  const orderDay = new Date(orderIds.orderTime);
  const deliveryDay = new Date(orderItem.estimatedDeliveryTime)
  const currentDate = new Date();

  const progress = ((currentDate - orderDay) / (deliveryDay - orderDay))* 100;

  let trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${formatted}
    </div>

    <div class="product-info">
      ${order.name}
    </div>

    <div class="product-info">
      Quantity: ${orderItem.quantity}
    </div>

    <img class="product-image" src="${order.image}">

    <div class="progress-labels-container">
      <div class="progress-label ${progress < 50? "current-status" : ""}">
        Preparing
      </div>
      <div class="progress-label ${progress >= 50 && progress <= 99? "current-status" : ""}">
        Shipped
      </div>
      <div class="progress-label ${progress >= 100? "current-status" : ""}">
        Delivered
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${progress}%"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

// trackingRender();