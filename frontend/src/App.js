import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/Home/Sidebar';
import Alltasks from './pages/Alltasks';
import Cards from './components/Home/Cards';
import Signup from './pages/Signup';
import CompletedTasks from './pages/CompletedTasks';
import IncompletedTasks from './pages/IncompletedTasks';
import Login from './pages/login';
import { authActions } from './store/auth';

const App = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
    if (isLoggedIn === false) {
      navigate('/signup');
    }
  }, []); 

  return (
    <div className="bg-gray-700 text-white h-screen p-2 relative">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Alltasks />} />
          <Route path="/completed-tasks" element={<CompletedTasks />} />
          <Route path="/incompleted-tasks" element={<IncompletedTasks />} />
        </Route>
        <Route path="/sidebar" element={<Sidebar />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
