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

function isWeekend(date) {
  const daysOfWeek = date.format('dddd');
  return daysOfWeek === 'Saturday' || daysOfWeek === 'Sunday';
}

export function calculateDeliveryDate(deliveryOptionMatch) {

  let remainingDays =  deliveryOptionMatch.deliveryDays;
  let deliveryDate = dayjs();
  
  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'days');

    if(!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }
  
  const dateString = deliveryDate.format('dddd, MMMM D');

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