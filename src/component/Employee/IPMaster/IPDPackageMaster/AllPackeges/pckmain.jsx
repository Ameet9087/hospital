import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Packegmasterpage from '../packegmasterpage';
import Consultation from './consultation';
import Investigation from './investigation';
import Pharmacy from './pharmacy';
import Service from './service';
import RoomType from './roomtype';

function Pckmain() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/"></Link>
          <Link to="/consultation"></Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Packegmasterpage />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path='/investigation' element={<Investigation/>}></Route>
          <Route path='/pharmacy' element={<Pharmacy/>}></Route>
          <Route path='/services' element={<Service/>}></Route>
          <Route path='/roomType' element={<RoomType/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default Pckmain;
