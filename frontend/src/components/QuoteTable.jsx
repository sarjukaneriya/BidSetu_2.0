import React from 'react';

export default function QuoteTable({ quotes }) {
  return (
    <table className="table-auto w-full mt-4">
      <thead>
        <tr>
          <th>Seller</th>
          <th>Price</th>
          <th>Delivery Days</th>
          <th>AI Score</th>
        </tr>
      </thead>
      <tbody>
        {quotes.map(q => (
          <tr key={q._id} className={q.isRecommended ? 'bg-green-100' : ''}>
            <td>{q.sellerId?.name}</td>
            <td className={q.isLowest ? 'font-bold' : ''}>{q.price}</td>
            <td>{q.deliveryDays}</td>
            <td>{q.aiScore}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
