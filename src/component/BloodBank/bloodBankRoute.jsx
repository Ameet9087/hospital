import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import BloodBankNavBar from './bloodBankNav';

import BloodDonationForm from './BloodDonation/bloodDonationForm';
import Bloodcollectionmain from './Blood Collection/bloodCollectionMain';
import HIMSSampleDataTable from './BloodTestingNScreening/SampleTable';
import BloodStorageDashboard from './BloodStorageDashboard/bloodStorageDashboard';
import BloodReq from './BloodRequest/bloodReq';
import BloodIssue from './BloodIssue/bloodIssue';
import BBReport from './BBReport/bBReport';
import Donarlist from './Blood Collection/DonationList/donationList';
import Colletionlist from './Blood Collection/CollectionList/collectionList';
function BloodBankRoute() {

  return (
    <>
        <BloodBankNavBar/>
        <div className="bloodBank-content">
        <Routes>
          <Route path="/blooddonationregistration" element={<BloodDonationForm />} />          
          <Route path="/bloodcollection/*" element={<Bloodcollectionmain />} /> 
          <Route path="/bloodtestingandscreening/*" element={<HIMSSampleDataTable />} /> 
          <Route path="/bloodstorage" element={<BloodStorageDashboard />} />          
          <Route path="/bloodrequest" element={<BloodReq />} />          
          <Route path="/bloodissues" element={<BloodIssue />} />          
          <Route path="/reports" element={<BBReport />} />   
          <Route path="/bloodcollection/donarlist" element={<Donarlist />} />   
          <Route path="/bloodcollection/collectionlist" element={<Colletionlist />} />   

                 
 

        </Routes>
      </div>
    </>
  )
}

export default BloodBankRoute
