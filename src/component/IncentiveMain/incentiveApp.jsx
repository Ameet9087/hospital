
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import "./App.css"
import '@fortawesome/fontawesome-free/css/all.css';
import IncentiveNavBar from './incentiveNavBar';
import IncentiveTransation from './IncentiveTransactions/incentiveTransation';
import IncentiveReport from './IncentiveReport/incentiveReport';
import InsentiveSettings from './IncentiveSetting/insentiveSettings';


function IncentiveApp() {
  const [count, setCount] = useState(0)

  return (
    <>
      
        <IncentiveNavBar/>
        <div className="incentive-content">
        <Routes>
        <Route path="transaction" element={<IncentiveTransation />} />
        <Route path="reports" element={<IncentiveReport />} />
        <Route path="setting" element={<InsentiveSettings />} />
       
        </Routes>
      </div>
      
    </>
  )
}

export default IncentiveApp
