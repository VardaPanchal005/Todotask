import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {authActions} from "../store/auth";
import { useDispatch ,useSelector} from 'react-redux';

function Login() {
  const [Data, setData] = useState({ username: '', password: '' });
  const history = useNavigate();
  const dispatch=useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    if (Data.username === '' || Data.password === '') {
      alert('All fields required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:1000/api/v1/log-in', Data);
      setData({ username: "", password: "" });
      localStorage.setItem("id",response.data.id);
      localStorage.setItem("token",response.data.token);
      dispatch(authActions.login());
      history("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className='p-4 w-2/6 rounded bg-gray-800'>
        <div>Login</div>
        <input 
          type="text" 
          placeholder="username" 
          className="bg-gray-600 px-3 py-2 my-3 w-full rounded" 
          name="username" 
          required 
          value={Data.username} 
          onChange={change} 
        />
        <input 
          type="password" 
          placeholder="password" 
          className="bg-gray-600 px-3 py-2 my-3 w-full rounded" 
          name="password" 
          required 
          value={Data.password} 
          onChange={change} 
        />
        <div className="w-full flex items-center justify-between font-semibold px-3 py-2 rounded">
          <button 
            className="bg-blue-400 text-xl font-semi-bold text-black px-3 py-2 rounded" 
            onClick={submit}
          >
            Login
          </button>
          <Link to="/signup" className="text-gray-400 hover:text-gray-200">
            Don't have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
