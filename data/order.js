export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach( (order) => {
    if (orderId === order.id) {
      matchingOrder = order;
    }
  })

  return matchingOrder;
}

export function getOrderItem(orderId, itemId) {
  let matchingOrder;
  let matchingItem = [];

  orders.forEach( (order) => {
    if (orderId === order.id) {
      matchingOrder = order;
    }
  })

  matchingOrder.products.forEach( (product) => {

    if (itemId === product.productId) {
      matchingItem = product;
    }
  })

  return matchingItem;
}