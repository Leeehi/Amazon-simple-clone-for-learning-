import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function getDeliveryOption(deliveryOptionId) {

  let deliveryOptionMatch;

    deliveryOptions.forEach( (option) => {

      if (option.id === deliveryOptionId) {
        deliveryOptionMatch = option;
      }
    })

  return deliveryOptionMatch || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOptionMatch) {

  const today = dayjs();
  let deliveryDay = today.add(deliveryOptionMatch.deliveryDays, 'days');
  
  while (deliveryDay.format('dddd') === 'Saturday' || deliveryDay.format('dddd') === 'Sunday') {
    deliveryDay = deliveryDay.subtract(1, 'days');
  }
  
  const dateString = deliveryDay.format('dddd, MMMM D');

  return dateString;
}

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},
{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},
{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];