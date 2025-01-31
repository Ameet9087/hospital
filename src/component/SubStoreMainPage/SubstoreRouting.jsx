import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SubStoreMain from './subStoreMain'
import SSIStock from "./SBAccountsNav/SSInventory/sSIStock"
import SSPStock from "./SBAccountsNav/SSPharmacy/sSPStock"
const SubstoreRouting = () => {
  return (
    <div>
      <Routes>
        <Route path="/stores" element={<SubStoreMain />} />
        <Route path="/pharmacy/:store" element={<SSPStock />} />
        <Route path="/inventory/:store" element={<SSIStock />} />
        </Routes> 
    </div>
  )
}

export default SubstoreRouting
