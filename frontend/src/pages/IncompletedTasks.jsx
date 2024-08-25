import React, { useState, useEffect } from 'react';
import Cards from "../components/Home/Cards";
import axios from "axios";

function IncompletedTasks() {
  const [Data, setData] = useState([]); 

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v2/get-incomplete-task", { headers });
        setData(response.data.data || []); 
      } catch (error) {
        console.error("Error fetching completed tasks:", error);
      }
    };
    fetch();
  }, []); 
  return (
    <Cards home={"false"} data={Data} />
  )
}

export default IncompletedTasks