import React, { useEffect, useState } from 'react';
import { CgNotes } from "react-icons/cg";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";

const Sidebar = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const data = [
    {
      title: "All tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Completed tasks",
      icon: <FaCheckDouble />,
      link: "/completed-tasks",
    },
    {
      title: "Incompleted tasks",
      icon: <TbNotebookOff />,
      link: "/incompleted-tasks",
    },
  ];

  const [Data, setData] = useState();
  const logout = () => {
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token");
    history("/signup");
  };

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
  }, []);

  return (
    <>
      {Data && (
        <div className="mb-4">
          <h2 className='text-xl font-semibold'>{Data.username}</h2>
          <div className='text-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap'>
            {Data.email}
          </div>
          <hr className='mt-2' />
        </div>
      )}
      <div>
        {data.map((items, i) => (
          <Link to={items.link} key={i} className="my-2 flex items-center p-2">
            {items.icon}&nbsp;{items.title}
          </Link>
        ))}
      </div>
      <div>
        <button className="bg-gray-400 w-full p-2 rounded mt-4" onClick={logout}>
          Log out
        </button>
      </div>
    </>
  );
}

export default Sidebar;
