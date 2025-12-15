export const cart = [];

export function updateCart(productId, quantity) {

  let matchingItem;
    
    cart.forEach( (item) => {

      if (productId === item.productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({
        productId,
        quantity
      });
    };
}