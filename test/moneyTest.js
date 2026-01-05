import { priceDisplay } from "../scripts/util/money.js";

console.log('Test suite: priceDisplay');

console.log('Converts cents to dollars')
if (priceDisplay(2299) === '22.99') {
  console.log('Passed');
} else {
  console.log('Failed');
}

console.log('Is working with zero')
if (priceDisplay(0) === '0.00') {
  console.log('Passed');
} else {
  console.log('Failed');
}

console.log('Rounds the number')
if (priceDisplay(2299.6) === '23.00') {
  console.log('Passed');
} else {
  console.log('Failed');
}