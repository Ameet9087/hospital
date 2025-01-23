import React from 'react'
import { Route, Routes } from 'react-router-dom'
import IPBilling from '../Nursing/NursingModule/IPBilling/iPBilling'
import OpdBilling from './OpdBilling/OpdBilling'
import Ipmoneyreceipt from './IP_Billing/Transactions/IPMoneyReceipt/IpmoneyReceipt'
import OPDBillCancellation from './OpdBilling/OPDBillCancellation'
import NavigationBilling from "./BillingNav"

const Billing = () => {
      return (
            <>
                  <NavigationBilling />
                  <Routes>
                        <Route path="/IPBilling/*" element={<IPBilling />} />
                        <Route path="/opdbilling" element={<OpdBilling />} />
                        <Route path="/IpdMoneyReceipt" element={<Ipmoneyreceipt />} />
                        <Route path="/OPDBillingCancel" element={<OPDBillCancellation />} />
                  </Routes>
            </>
      )
}

export default Billing