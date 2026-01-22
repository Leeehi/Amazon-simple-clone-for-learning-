import { cart } from '../data/cart-class.js';
import { product, loadProducts, loadProductsFetch, filteredProducts } from '../data/products.js';
import { priceDisplay } from './util/money.js';

// loadProducts(renderAmazon);
async function loadPages() {
  await loadProductsFetch();

  renderAmazon();
}

loadPages();

function renderAmazon() {
  let productHTML = '';

  let toRenderProduct = product;

  const url = new URL(window.location.href);
  const searchTerm = url.searchParams.get('search');

  if (searchTerm) {
    toRenderProduct = filteredProducts(searchTerm);
  }

  // console.log(toRenderProduct.length);

  toRenderProduct.forEach( (products) => {
    productHTML += `
      <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${products.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
              ${products.name}
            </div>

            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${products.getStarUrl()}">
              <div class="product-rating-count link-primary">
                ${products.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${products.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="js-quantity-selector-${products.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            ${products.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${products.id}">
              <img src="images/icons/checkmark.png">
              Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${products.id}">
              Add to Cart
            </button>
      </div>
    `;
  });

  if (toRenderProduct.length === 0) {
      productHTML = `<div class="no-results">No products found for "${searchTerm}"</div>`;
      // console.log(`No products found for "${searchTerm}"`);
    }

  document.querySelector('.js-products-grid').innerHTML = productHTML;

  function updateCartQuantity() {

    let cartQuantity = cart.calculateCartQuantity();

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  }

  updateCartQuantity();

  document.querySelectorAll('.js-add-to-cart').forEach( (button) => {

    let timeoutId;

    button.addEventListener('click', () => {
      
      let { productId } = button.dataset;

      let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
      
      cart.updateCart(productId, quantity);

      updateCartQuantity();

      document.querySelector(`.js-added-to-cart-${productId}`).classList.add('visible');
      
      clearTimeout(timeoutId);

      timeoutId = setTimeout( () => {
        document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('visible');
      }, 2000);
    });
  });

  document.querySelector('.js-search-button').addEventListener( 'click', () => {

    const search = document.querySelector('.js-search-bar').value;

    // window.location.href = `amazon.html?search=${search}`;
    window.location.href = `amazon.html?search=${encodeURIComponent(search)}`;
  });

  document.querySelector('.js-search-bar').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
      const search = event.target.value;
      window.location.href = `amazon.html?search=${encodeURIComponent(search)}`;
    }
  });

};