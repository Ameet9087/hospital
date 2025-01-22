/* Ajhar tamboli sSPRequisition.jsx 19-09-24 */


import React, { useEffect, useState } from 'react';
import "../SSPharmacy/sSPRequisition.css";
import { useParams } from 'react-router-dom';
import SSPharmacyReqCreateReq from './sSPharmacyReqCreateReq';
import { API_BASE_URL } from '../../../api/api';
import CustomModal from '../../../../CustomModel/CustomModal';
import RequisitionDetails from './RequisitionDetails';

function SSPRequisition() {
  const { store } = useParams();
  const [requisitions, setRequisitions] = useState([]);
  const [showView,setShowView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest,setSelectedRequest] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchRequisitions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/subpharm-requisitions`);
        if (!response.ok) {
          throw new Error('Failed to fetch requisitions');
        }
        const data = await response.json();
        const filteredData = data.filter(item => item.subStore.subStoreId == store);
        console.log(filteredData);
        
        setRequisitions(filteredData);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRequisitions();
  }, [store]);


  const handleView=(item)=>{
    setSelectedRequest(item);
    setShowView(true);
  }

  return (
    <div className="sSPRequisition-container">
      <button className="sSPRequisition-create-requisition" onClick={handleOpenPopup}>
        <i className="fa-solid fa-plus"></i> Create Requisition
      </button>
      
      {isPopupOpen && (
        <div className="sSPRequisition-modal-overlay">
          <div className="sSPRequisition-modal-content">
            <button className="sSPRequisition-close-button" onClick={handleClosePopup}>
              &times;
            </button>
            <SSPharmacyReqCreateReq onClose={handleClosePopup} />
          </div>
        </div>
      )}

       <div className="sSPRequisition-search-N-results">
          <div className="sSPRequisition-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="sSPRequisition-results-info">
        <span>Showing {requisitions?.length} / {requisitions?.length} results</span>
            {/* Showing 2 / 2 results */}
            <button className='sSPRequisition-print-btn' 
            // onClick={handleExportToExcel}
            >
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className='sSPRequisition-print-btn' 
            // onClick={handlePrint}
            ><i class="fa-solid fa-print"></i> Print</button>
          </div>
        </div>
        <table className="sSPRequisition-table">
          <thead>
            <tr>
              <th>Req No.</th>
              <th>Requested By</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requisitions.map((req) => (
              <tr key={req?.id}>
                <td>{req?.pharRequisitionId}</td>
                <td>{req?.subStore?.subStoreName}</td>
                <td>{req?.requestedDate}</td>
                <td>{req?.status}</td>
                <td>
                  <button className="sSPRequisition-btn-view" onClick={()=>handleView(req)} >View</button>
                  {req?.status === 'Dispatch' ? (
                    <button className="sSPRequisition-btn-receive">Receive Items</button>
                  ): null  }
                </td>
              </tr>
            ))}
          </tbody>
        </table> 
        <CustomModal isOpen={showView} onClose={()=>setShowView(false)}>
          <RequisitionDetails request={selectedRequest}/>
      </CustomModal>
    </div>
   
  );
}

export default SSPRequisition;
