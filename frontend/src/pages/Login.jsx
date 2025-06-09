import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const handleChange = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = async e => {
    e.preventDefault();
    const res = await axios.post('/api/auth/login', form);
    login(res.data.token);
    navigate(`/${res.data.user.role}`);
  };
  return (
    <div className="p-4 max-w-sm mx-auto space-y-2">
      <form onSubmit={submit} className="space-y-2">
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-1 w-full" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-1 w-full" />
        <button className="bg-blue-500 text-white px-3 py-1 w-full">Login</button>
      </form>
      <Link to="/register" className="text-blue-500">Register</Link>
    </div>
  );
}
