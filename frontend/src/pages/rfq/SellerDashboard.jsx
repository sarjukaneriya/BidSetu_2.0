import { useEffect, useState } from "react";
import axios from "axios";
import SubmitQuoteForm from "./SubmitQuoteForm";

const SellerDashboard = () => {
  const [rfqs, setRfqs] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get("/api/rfq/open").then((res) => setRfqs(res.data.data || []));
  }, []);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-semibold text-white">Open RFQs</h2>
      <ul className="space-y-2">
        {rfqs.map((r) => (
          <li key={r._id}>
            <button className="text-blue-400 underline" onClick={() => setSelected(r)}>
              {r.itemName}
            </button>
          </li>
        ))}
      </ul>
      {selected && <SubmitQuoteForm rfqId={selected._id} />}
    </div>
  );
};

export default SellerDashboard;
