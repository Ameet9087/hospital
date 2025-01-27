import React from 'react'
import { Route, Routes } from 'react-router-dom'
import IPBilling from '../Nursing/NursingModule/IPBilling/iPBilling'
import OpdBilling from './OpdBilling/OpdBilling'
import Ipmoneyreceipt from './IP_Billing/Transactions/IPMoneyReceipt/IpmoneyReceipt'
import OPDBillCancellation from './OpdBilling/OPDBillCancellation'
import NavigationBilling from "./BillingNav"
import Finalbill from './IP_Billing/Transactions/FinalBill/FinalBill'
import OPDPostDiscount from './OpdBilling/OPDPostDiscount'

const Billing = () => {
      return (
            <>
                  <NavigationBilling />
                  <Routes>
                        <Route path="/ipbilling/*" element={<IPBilling />} />
                        <Route path="/opdbilling" element={<OpdBilling />} />
                        <Route path='/opdpostdiscount' element={<OPDPostDiscount />} />

                        <Route path="/ipdmoneyrecipt" element={<Ipmoneyreceipt />} />

                        <Route path="/opdbillingcancel" element={<OPDBillCancellation />} />
                        <Route path="/finalbilling" element={< Finalbill />} />
                  </Routes>
            </>
      )
}

export default Billing