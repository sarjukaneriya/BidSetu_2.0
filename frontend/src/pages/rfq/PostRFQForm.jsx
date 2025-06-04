import { useState } from "react";
import axios from "axios";

const PostRFQForm = ({ onCreated }) => {
  const [form, setForm] = useState({
    itemName: "",
    category: "",
    quantity: 0,
    unit: "",
    deadline: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/rfq", form);
    onCreated && onCreated(res.data.data);
    setForm({ itemName: "", category: "", quantity: 0, unit: "", deadline: "", location: "" });
  };

  return (
    <form onSubmit={submit} className="grid grid-cols-2 gap-2 text-black">
      {Object.keys(form).map((k) => (
        <input
          key={k}
          name={k}
          value={form[k]}
          onChange={handleChange}
          placeholder={k}
          className="p-2 rounded"
        />
      ))}
      <button className="col-span-2 bg-blue-500 text-white p-2 rounded">Post RFQ</button>
    </form>
  );
};

export default PostRFQForm;
