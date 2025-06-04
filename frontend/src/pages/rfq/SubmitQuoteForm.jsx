import { useState } from "react";
import axios from "axios";

const SubmitQuoteForm = ({ rfqId, onSubmitted }) => {
  const [form, setForm] = useState({ price: 0, deliveryDays: 0, gstIncluded: false, comment: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`/api/rfq/quote/${rfqId}`, form);
    onSubmitted && onSubmitted(res.data.data);
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-2 gap-2 text-black">
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" className="p-2 rounded" />
      <input name="deliveryDays" value={form.deliveryDays} onChange={handleChange} placeholder="Delivery Days" className="p-2 rounded" />
      <label className="col-span-2 text-white">
        <input type="checkbox" name="gstIncluded" checked={form.gstIncluded} onChange={handleChange} /> GST Included
      </label>
      <textarea name="comment" value={form.comment} onChange={handleChange} placeholder="Comment" className="col-span-2 p-2 rounded" />
      <button className="col-span-2 bg-blue-500 text-white p-2 rounded">Submit Quote</button>
    </form>
  );
};

export default SubmitQuoteForm;
