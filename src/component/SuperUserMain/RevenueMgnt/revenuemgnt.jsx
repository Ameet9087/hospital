// Neha Superuser-revenue manaeh=ment 2709-24
import React from 'react'
import PatientManagement from './RevenueDashboard/revenuedashboard'
import RevenueDashboard from './RevenueDashboard/revenuedashboard';
import { Link, Route, Routes } from 'react-router-dom';
function Revenuemgnt() {
  return (
    <div>
        <header>
            <nav>
                <ul>
                <Link to="/superuser/revenuemanagement/revenuedashoboard"><li>revenue dashboard</li></Link>
                </ul>
            </nav>
        </header>
      <div>
        <Routes>
            <Route path="/revenuemanagement/revenuedashoboard" element={<RevenueDashboard/>}>

            </Route>
        </Routes>
      </div>
    </div>
  )
}

export default Revenuemgnt
