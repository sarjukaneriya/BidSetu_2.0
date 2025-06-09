import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import SubmitQuoteForm from '../components/SubmitQuoteForm';

export default function SellerDashboard(){
  const [rfqs,setRfqs] = useState([]);
  const [selected, setSelected] = useState(null);
  const token = localStorage.getItem('token');

  const fetchRfqs= async()=>{
    const res = await axios.get('/api/rfq',{ headers:{ Authorization:`Bearer ${token}` }});
    setRfqs(res.data);
  };
  useEffect(()=>{ fetchRfqs(); },[]);

  return (
    <div>
      <Navbar />
      <div className="p-4">
        <h2 className="font-bold">Available RFQs</h2>
        <ul>
          {rfqs.map(r=> (
            <li key={r._id} className="underline cursor-pointer" onClick={()=>setSelected(r._id)}>{r.itemName}</li>
          ))}
        </ul>
        {selected && <SubmitQuoteForm rfqId={selected} onSubmitted={()=>setSelected(null)} />}
      </div>
    </div>
  );
}
