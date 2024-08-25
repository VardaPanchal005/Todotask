import React from 'react'
import Cards from "../components/Home/Cards";
import Inputdata from "../components/Home/Inputdata";
import {useState,useEffect} from "react";
import axios from "axios";
const Alltasks=() => {
  const [input,setInput]=useState("hidden");  
  const [Data, setData] = useState();
  const [UpdateData,setUpdatedData]=useState({id:"",
    title:"",description:"",
  })
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }; 
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v2/get-all-tasks", { headers });
      setData(response.data.data);
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")){
    fetch();
    }
  }); 
  return (<>
    <div>
        <div className="w-full flex justify-end px-4 py-2">
        </div>
        {Data && (<Cards home={"true"} setInput={setInput} data={Data.tasks} setUpdatedData={setUpdatedData}/>)}</div>
        <Inputdata input={input} setInput={setInput} UpdateData={UpdateData} setUpdatedData={setUpdatedData}/></>
  )
}

export default Alltasks