import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <button
        onClick={() => dispatch(logout())}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;