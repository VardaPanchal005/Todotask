import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  const [Data, setData] = useState({ username: '', email: '', password: '' });

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    if (Data.username === '' || Data.email === '' || Data.password === '') {
      alert('All fields required');
      return;
    }
    try {
      const response = await axios.post('http://localhost:1000/api/v1/sign-in', Data); 
      setData({ username: '', email: '', password: '' });
      alert(response.data.message);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center">
      <div className='p-4 w-2/6 rounded bg-gray-800'>
        <div>Signup</div>
        <input
          type="text"
          placeholder="username"
          className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input
          type="email"
          placeholder="email"
          className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
          name="email"
          value={Data.email}
          onChange={change}
        />
        <input
          type="password"
          placeholder="password"
          className="bg-gray-600 px-3 py-2 my-3 w-full rounded"
          name="password"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex items-center justify-between font-semibold px-3 py-2 rounded">
          <button
            className="bg-blue-400 text-xl font-semi-bold text-black px-3 py-2 rounded"
            onClick={submit}
          >
            Signup
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-200">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
