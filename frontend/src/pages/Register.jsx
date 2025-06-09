import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'buyer' });
  const navigate = useNavigate();
  const handleChange = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = async e => {
    e.preventDefault();
    await axios.post('/api/auth/register', form);
    navigate('/');
  };
  return (
    <div className="p-4 max-w-sm mx-auto space-y-2">
      <form onSubmit={submit} className="space-y-2">
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-1 w-full" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-1 w-full" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-1 w-full" />
        <select name="role" onChange={handleChange} className="border p-1 w-full">
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
        <button className="bg-blue-500 text-white px-3 py-1 w-full">Register</button>
      </form>
      <Link to="/" className="text-blue-500">Login</Link>
    </div>
  );
}
