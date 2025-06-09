function scoreQuotes(quotes) {
  if (!quotes.length) return [];
  const maxPrice = Math.max(...quotes.map(q => q.price));
  const minPrice = Math.min(...quotes.map(q => q.price));
  const maxDays = Math.max(...quotes.map(q => q.deliveryDays));
  const minDays = Math.min(...quotes.map(q => q.deliveryDays));

  return quotes.map(q => {
    const priceScore = (maxPrice - q.price) / (maxPrice - minPrice || 1);
    const dayScore = (maxDays - q.deliveryDays) / (maxDays - minDays || 1);
    q.aiScore = Number(((priceScore + dayScore) / 2).toFixed(2));
    return q;
  }).sort((a,b)=>b.aiScore - a.aiScore).map((q,i)=>{
    q.isRecommended = i===0;
    return q;
  });
}
module.exports = { scoreQuotes };
