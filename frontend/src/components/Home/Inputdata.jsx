import React, { useState, useEffect } from 'react';
import { ImCross } from "react-icons/im";
import axios from 'axios';

const Inputdata = ({ input, setInput, UpdateData, setUpdatedData }) => {
  const [Data, setData] = useState({ title: "", description: "" });

  useEffect(() => {
    if (UpdateData.id) {
      setData({
        title: UpdateData.title || "",
        description: UpdateData.description || ""
      });
    } else {
      setData({ title: "", description: "" });
    }
  }, [UpdateData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submitData = async () => {
    if (Data.title === "" || Data.description === "") {
      alert("All fields are required");
      return;
    }

    if (UpdateData.id) {
      try {
        await axios.put(`http://localhost:1000/api/v2/update-task/${UpdateData.id}`, Data, { headers });
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      try {
        await axios.post("http://localhost:1000/api/v2/create-task", Data, { headers });
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }

    setData({ title: "", description: "" });
    setInput("hidden");
    setUpdatedData({ id: "", title: "", description: "" });
  };

  const UpdateTask=async()=>{
    if(Data.title === "" || Data.description === ""){
      alert("All fields are required");
    }
    else{
      await axios.post(`http://localhost:1000/api/v2/update-task/${UpdateData.id}`, Data, { headers });
    }
    setUpdatedData({
      id:"",
      title:"",
      description:""
    });
    setData({ title: "", description: "" });
    setInput("hidden");
  }

  return (
    <>
      <div className={`${input} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
      <div className={`${input} top-0 left-0 flex items-center justify-center h-screen w-full`}>
        <div className="w-2/6 bg-gray-900 p-4 rounded">
          <div className="flex justify-end">
            <button className="text-xl" onClick={() => {
              setInput("hidden");
              setData({ title: "", description: "" });
              setUpdatedData({ id: "", title: "", description: "" });
            }}>
              <ImCross />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.title}
            onChange={change}
            required
          />
          <textarea
            name="description"
            cols="30"
            rows="8"
            placeholder="Enter the description"
            className="px-3 py-2 rounded w-full bg-gray-600 my-3"
            value={Data.description}
            onChange={change}
            required
          ></textarea>
          <button
            className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
            onClick={submitData}
          >
            {UpdateData.id ? "Update" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Inputdata;
