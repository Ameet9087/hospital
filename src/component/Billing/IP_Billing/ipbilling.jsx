// src/Routes.jsx

import React from 'react';
import { Routes, Route} from 'react-router-dom';
import Ipmoneyreceipt from "./Transactions/IPMoneyReceipt/IpmoneyReceipt";
import NavigationBilling from './Transactions/NavigationBilling';
import FinalBill from './Transactions/FinalBill/FinalBill';
import IPBilling from '../../Nursing/NursingModule/IPBilling/iPBilling'
import { Provider } from 'react-redux';
import { store } from '../../Nursing/NursingModule/ReduxNursing/store';
import OpdBilling from '../OpdBilling/OpdBilling';

const BillingRouting = () => {
  return (
    <>
<NavigationBilling/>
<Provider store={store}>

    <Routes>
    <Route path="/billing/ipmoney-receipt" element={<Ipmoneyreceipt />} />
    <Route path='/billing/finalbill' element={<FinalBill/>} />
    <Route path='/billing/IPBilling' element={<IPBilling/>} />
    <Route path='/billing/opbilling' element={<OpdBilling/>}/>

   
    </Routes>
</Provider>
    </>
  );
};

export default BillingRouting;

