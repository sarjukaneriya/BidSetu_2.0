import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function AdminDashboard(){
  const [users,setUsers] = useState([]);
  const token = localStorage.getItem('token');

  const fetchUsers = async()=>{
    const res = await axios.get('/api/admin/users',{ headers:{ Authorization:`Bearer ${token}` }});
    setUsers(res.data);
  };
  useEffect(()=>{ fetchUsers(); },[]);

  const ban = async id => {
    await axios.delete(`/api/admin/users/${id}`,{ headers:{ Authorization:`Bearer ${token}` }});
    fetchUsers();
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h2 className="font-bold">All Users</h2>
        <ul>
          {users.map(u=>(
            <li key={u._id} className="flex justify-between">
              <span>{u.name} - {u.role}</span>
              <button className="text-red-500" onClick={()=>ban(u._id)}>Ban</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
