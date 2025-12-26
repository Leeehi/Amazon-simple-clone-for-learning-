import {cart, deleteFunction, updateQuantity, calculateCartQuantity} from "../data/cart.js";
import {product} from "../data/products.js";
import { moneyDisplay } from "./util/money.js";

function renderOrder() {

  let productsHTML = '';

  cart.forEach( (products) => {

    let matchingItems;

    product.forEach( (item) => {

      if (products.productId === item.id) {
        matchingItems = item;
      }
    });

    productsHTML += `
      <div class="cart-item-container js-cart-item-${matchingItems.id}">
              <div class="delivery-date">
                Delivery date: Tuesday, June 21
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingItems.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingItems.name}
                  </div>
                  <div class="product-price">
                    $${moneyDisplay(matchingItems.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label">${products.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingItems.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingItems.id}">
                    <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingItems.id}">
                    Save
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-primary-id="${matchingItems.id}">
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="delivery-option">
                    <input type="radio" checked
                      class="delivery-option-input"
                      name="delivery-option-${matchingItems.id}">
                    <div>
                      <div class="delivery-option-date">
                        Tuesday, June 21
                      </div>
                      <div class="delivery-option-price">
                        FREE Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingItems.id}">
                    <div>
                      <div class="delivery-option-date">
                        Wednesday, June 15
                      </div>
                      <div class="delivery-option-price">
                        $4.99 - Shipping
                      </div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingItems.id}">
                    <div>
                      <div class="delivery-option-date">
                        Monday, June 13
                      </div>
                      <div class="delivery-option-price">
                        $9.99 - Shipping
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    `;

  });

  document.querySelector('.js-order-summary').innerHTML = productsHTML;

  document.querySelectorAll('.js-delete-link').forEach( (link) => {

    link.addEventListener('click', () => {

      let {primaryId} = link.dataset;

      deleteFunction(primaryId);

      const productItem = document.querySelector(`.js-cart-item-${primaryId}`)

      productItem.remove();

      renderOrder();
    })
  })

  document.querySelectorAll('.js-update-quantity-link').forEach ( (link) => {

    let { productId } = link.dataset;

    link.addEventListener( 'click', () => {


      const displayer = document.querySelector(`.js-cart-item-${productId}`);

      displayer.classList.add('is-editing-quantity');
    })
  })

  function updateCartQuantity() {

    let cartCount = calculateCartQuantity();

    let isWithS = cartCount > 1 ? 'items' : 'item'; 

    document.querySelector('.js-return-to-home-link').innerHTML = `${cartCount} ${isWithS}`;
  }
  updateCartQuantity();

  document.querySelectorAll('.js-save-quantity-link').forEach ( (link) => {

    let { productId } = link.dataset;
    let quantityinput = document.querySelector(`.js-quantity-input-${productId}`);

    link.addEventListener('click', () => {

      let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

      updateQuantity(productId, newQuantity);

      const displayer = document.querySelector(`.js-cart-item-${productId}`);

      displayer.classList.remove('is-editing-quantity');

      renderOrder();
    })
  })
}

renderOrder();