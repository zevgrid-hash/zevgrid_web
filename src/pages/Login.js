import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <button
          onClick={() => dispatch(login())}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;