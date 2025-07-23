import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import BroadcastPage from '../pages/BroadcastPage';
import AddMessagePage from '../pages/AddMessagePage';
import SendMessageHistory from '../pages/SendMessageHistory';

const AppRouter = () => (
  <Routes>
    {/* <Route path="/" element={<HomePage />} /> */}
    <Route path="/" element={<BroadcastPage />} />
    <Route path="/broadcast/add" element={<AddMessagePage />} />
    <Route path="/broadcast/send" element={<SendMessageHistory />} />
  </Routes>
);

export default AppRouter;
