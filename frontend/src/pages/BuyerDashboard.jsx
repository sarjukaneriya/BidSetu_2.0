import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import PostRFQForm from '../components/PostRFQForm';
import QuoteTable from '../components/QuoteTable';

export default function BuyerDashboard(){
  const [rfqs,setRfqs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [quotes, setQuotes] = useState([]);
  const token = localStorage.getItem('token');

  const fetchRfqs= async()=>{
    const res = await axios.get('/api/rfq',{ headers:{ Authorization:`Bearer ${token}` }});
    setRfqs(res.data);
  };
  useEffect(()=>{ fetchRfqs(); },[]);

  const selectRfq = async id => {
    setSelected(id);
    const res = await axios.get(`/api/quote/rfq/${id}`,{ headers:{ Authorization:`Bearer ${token}` }});
    setQuotes(res.data);
  };

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <PostRFQForm onPosted={fetchRfqs} />
        <h2 className="mt-4 font-bold">My RFQs</h2>
        <ul>
          {rfqs.map(r=>(
            <li key={r._id} className="underline cursor-pointer" onClick={()=>selectRfq(r._id)}>{r.itemName}</li>
          ))}
        </ul>
        {quotes.length>0 && (
          <div>
            <h2 className="mt-4 font-bold">Quotes</h2>
            <QuoteTable quotes={quotes} />
          </div>
        )}
      </div>
    </div>
  );
}
