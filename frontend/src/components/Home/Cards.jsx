import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from 'axios';

const Cards = ({ home, setInput, data, setUpdatedData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleCompleteTask = async (id) => {
    try {
      await axios.put(`http://localhost:1000/api/v2/update-complete-task/${id}`, {}, { headers });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`, { headers });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (id, title, description) => {
    setInput("fixed");
    setUpdatedData({ id: id, title: title, description: description });
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {data && data.map((items, i) => (
        <div key={i} className="bg-gray-800 rounded-sm p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold break-words">{items.title}</h3>
            <p 
              className="text-gray-300 my-2 break-words" 
              style={{ minHeight: "100px", maxHeight: "200px", whiteSpace: "pre-wrap", wordWrap: "break-word" }}
            >
              {items.description}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <button 
              className={`p-2 rounded w-3/6 ${items.complete === false ? "bg-red-400" : "bg-green-400"}`} 
              onClick={() => handleCompleteTask(items._id)}
            >
              {items.complete === true ? "Complete" : "Incomplete"}
            </button>
            <div className="flex w-3/6 justify-between items-center">
              <button 
                className="p-2 flex items-center text-white text-2xl font-semibold" 
                onClick={() => handleUpdate(items._id, items.title, items.description)}
                style={{ marginRight: 'auto', marginLeft: 'auto' }} // Center Edit button
              >
                <FaEdit />
              </button>
              <button 
                className="p-2 flex items-center text-white text-2xl font-semibold" 
                onClick={() => deleteTask(items._id)}
              >
                <MdDelete />
              </button>
            </div>
          </div>
        </div>
      ))}
      {home === "true" && (
        <button
          className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-transform"
          onClick={() => setInput("fixed")}
        >
          <IoAddCircleSharp className="text-4xl" />
          <h2 className="text-2xl mt-4">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
