import React, { useState } from 'react';
import axios from 'axios';

export default function PostRFQForm({ onPosted }) {
  const [form, setForm] = useState({ itemName:'', quantity:'', category:'', deadline:'' });

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async e => {
    e.preventDefault();
    await axios.post('/api/rfq', form, { headers:{ Authorization:`Bearer ${localStorage.getItem('token')}` }});
    onPosted();
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <input name="itemName" placeholder="Item Name" onChange={handleChange} className="border p-1" />
      <input name="quantity" placeholder="Quantity" onChange={handleChange} className="border p-1" />
      <input name="category" placeholder="Category" onChange={handleChange} className="border p-1" />
      <input type="date" name="deadline" onChange={handleChange} className="border p-1" />
      <button className="bg-green-500 text-white px-3 py-1" type="submit">Post RFQ</button>
    </form>
  );
}
