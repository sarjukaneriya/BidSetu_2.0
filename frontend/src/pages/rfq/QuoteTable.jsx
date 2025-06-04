import { useEffect, useState } from "react";
import axios from "axios";

const QuoteTable = ({ rfqId }) => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    axios.get(`/api/rfq/quotes/${rfqId}`).then((res) => setQuotes(res.data.data));
  }, [rfqId]);

  const award = async (id) => {
    await axios.post(`/api/rfq/award/${id}`);
    setQuotes((q) => q.map((x) => (x._id === id ? { ...x, status: "Awarded" } : x)));
  };

  return (
    <table className="min-w-full text-white">
      <thead>
        <tr>
          <th>Seller</th>
          <th>Price</th>
          <th>Days</th>
          <th>AI Score</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {quotes.map((q) => (
          <tr
            key={q._id}
            className={
              q.isRecommended ? "bg-green-800" : q.isLowest ? "bg-yellow-800" : ""
            }
          >
            <td>{q.sellerId?.fullName}</td>
            <td>{q.price}</td>
            <td>{q.deliveryDays}</td>
            <td>{q.aiScore?.toFixed(2)}</td>
            <td>
              {q.status !== "Awarded" && (
                <button
                  className="bg-blue-500 p-1 rounded"
                  onClick={() => award(q._id)}
                >
                  Award
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QuoteTable;
