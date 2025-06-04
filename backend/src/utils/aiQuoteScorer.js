const scoreQuote = (price, deliveryDays, rating = 5) => {
  const score = 0.5 * price + 0.3 * deliveryDays + 0.2 * (1 - rating / 5);
  return score;
};

export default scoreQuote;
