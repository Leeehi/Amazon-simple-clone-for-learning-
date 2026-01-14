import { product, Product, Clothing, Appliance } from "../../data/products.js";

describe('test suite: product', () => {

  it('Product: has correct properties and method', () => {

    const products = [{
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678d7",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Cotton Socks - 6 Pairs",
      rating: {
        stars: 5.0,
        count: 67
      },
      priceCents: 1199,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    },
    {
      id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
      image: "images/products/knit-athletic-sneakers-gray.jpg",
      name: "Waterproof Knit Athletic Sneakers - Gray",
      rating: {
        stars: 4,
        count: 89
      },
      priceCents: 3390,
      keywords: [
        "shoes",
        "running shoes",
        "footwear"
      ]
    }].map( (product) => {
      return new Product(product);
    });

    expect(products[0].name).toEqual('Cotton Socks - 6 Pairs');
    expect(products[0].getPrice()).toEqual('$11.99');
    expect(products[0].extraInfoHTML()).toEqual('');
    expect(products[0].getStarUrl()).toEqual('images/ratings/rating-50.png');
  })

  it('Clothing: has correct properties and method', () => {

    const products = [{
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678d7",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Cotton Socks - 6 Pairs",
      rating: {
        stars: 5.0,
        count: 67
      },
      priceCents: 1199,
      type: 'clothing',
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    },
    {
      id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
      image: "images/products/knit-athletic-sneakers-gray.jpg",
      name: "Waterproof Knit Athletic Sneakers - Gray",
      rating: {
        stars: 4,
        count: 89
      },
      priceCents: 3390,
      type: 'clothing',
      keywords: [
        "shoes",
        "running shoes",
        "footwear"
      ]
    }].map( (product) => {
      return new Clothing(product);
    });

    expect(products[0].name).toEqual('Cotton Socks - 6 Pairs');
    expect(products[0].getPrice()).toEqual('$11.99');
    expect(products[0].extraInfoHTML()).toContain('Size chart');
    expect(products[0].getStarUrl()).toEqual('images/ratings/rating-50.png');
  })

  it('Appliance: has correct properties and method', () => {

    const products = [{
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678d7",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Cotton Socks - 6 Pairs",
      rating: {
        stars: 5.0,
        count: 67
      },
      priceCents: 1199,
      type: 'appliance',
      keywords: [
        "socks",
        "sports",
        "apparel"
      ]
    },
    {
      id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
      image: "images/products/knit-athletic-sneakers-gray.jpg",
      name: "Waterproof Knit Athletic Sneakers - Gray",
      rating: {
        stars: 4,
        count: 89
      },
      priceCents: 3390,
      type: 'appliance',
      keywords: [
        "shoes",
        "running shoes",
        "footwear"
      ]
    }].map( (product) => {
      return new Appliance(product);
    });

    expect(products[0].name).toEqual('Cotton Socks - 6 Pairs');
    expect(products[0].getPrice()).toEqual('$11.99');
    expect(products[0].extraInfoHTML()).toContain('Instructions', 'Warranty');
    expect(products[0].getStarUrl()).toEqual('images/ratings/rating-50.png');
  })
})