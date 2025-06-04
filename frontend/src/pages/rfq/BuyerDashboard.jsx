import { useEffect, useState } from "react";
import axios from "axios";
import PostRFQForm from "./PostRFQForm";
import QuoteTable from "./QuoteTable";

const BuyerDashboard = () => {
  const [rfqs, setRfqs] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("/api/rfq?mine=true").then((res) => setRfqs(res.data.data || []));
  }, []);

  return (
    <div className="p-4 space-y-6">
      <PostRFQForm onCreated={(r) => setRfqs((prev) => [...prev, r])} />
      <h2 className="text-xl font-semibold text-white">My RFQs</h2>
      <ul className="space-y-2">
        {rfqs.map((r) => (
          <li key={r._id}>
            <button
              onClick={() => setSelected(r)}
              className="text-blue-400 underline"
            >
              {r.itemName}
            </button>
          </li>
        ))}
      </ul>
      {selected && <QuoteTable rfqId={selected._id} />}
    </div>
  );
};

export default BuyerDashboard;
