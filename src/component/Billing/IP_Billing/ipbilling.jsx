// src/Routes.jsx

import React from 'react';
import { Routes, Route} from 'react-router-dom';

import Ipmoneyreceipt from "./Transactions/IPMoneyReceipt/IpmoneyReceipt";
import NavigationBilling from './Transactions/NavigationBilling';
import FinalBill from './Transactions/FinalBill/FinalBill';


const BillingRouting = () => {
  return (
    <>
<NavigationBilling/>
    <Routes>
    <Route path="/billing/ipmoney-receipt" element={<Ipmoneyreceipt />} />
    <Route path='/billing/finalbill' element={<FinalBill/>} />
   
    </Routes>
    </>
  );
};

export default BillingRouting;

