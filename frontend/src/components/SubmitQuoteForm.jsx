import React, { useState } from 'react';
import axios from 'axios';

export default function SubmitQuoteForm({ rfqId, onSubmitted }) {
  const [form, setForm] = useState({ price:'', deliveryDays:'', comment:'' });
  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});
  const submit = async e => {
    e.preventDefault();
    await axios.post('/api/quote', { ...form, rfqId }, { headers:{ Authorization:`Bearer ${localStorage.getItem('token')}` }});
    onSubmitted();
  };
  return (
    <form onSubmit={submit} className="space-y-2">
      <input name="price" placeholder="Price" onChange={handleChange} className="border p-1" />
      <input name="deliveryDays" placeholder="Delivery Days" onChange={handleChange} className="border p-1" />
      <input name="comment" placeholder="Comment" onChange={handleChange} className="border p-1" />
      <button className="bg-green-500 text-white px-3 py-1" type="submit">Submit Quote</button>
    </form>
  );
}
