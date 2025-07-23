import React, { useEffect, useState } from "react";
import AddSocMaster from "./AddSocMaster";
import CustomModal from "../../CustomModel/CustomModal";
import "./SocMaster.css";
import axios from "axios";
import { API_BASE_URL } from "../../api/api";
import { useFilter } from "../../ShortCuts/useFilter";

const SocMaster = () => {
  const [show, setShow] = useState(false);
  const [socs, setSocs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [update,setUpdate]= useState({});
  const [showUpdate,setShowUpdate] = useState(false);

  const fetchSoc = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/socmasters`);
      setSocs(response.data);
    } catch (error) {
      console.error("Error fetching SOC masters:", error);
    }
  };

  useEffect(() => {
    fetchSoc();
  }, [show,showUpdate]);

  const handleClose = () => {
    setShow(false);
    setShowUpdate(false);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredItems = useFilter(socs, searchTerm);


  const handleUpdate=(item)=>{
    setUpdate(item);
    setShowUpdate(true);
  }
  return (
    <div className="soc-master-page">
      <div className="soc-master-header">
        <button className="soc-master-add-btn" onClick={() => setShow(true)}>
          Add SOC
        </button>
        <input
          type="text"
          className="soc-master-search"
          placeholder="Search SOC Master..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <table className="soc-master-table">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>SOC Name</th>
            <th>Remarks</th>
            <th>From</th>
            <th>To</th>
            <th>OP Reg Fees</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <tr key={item.socId}>
                <td>{index + 1}</td>
                <td>{item.socName}</td>
                <td>{item.remarks}</td>
                <td>{item.dateFrom}</td>
                <td>{item.dateTo}</td>
                <td>{item.opRegFees}</td>
                <td>{item.status}</td>
                <td>
                  <button className="soc-master-action-btn" onClick={()=>handleUpdate(item)}>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No SOC data available</td>
            </tr>
          )}
        </tbody>
      </table>

      <CustomModal isOpen={show} onClose={handleClose}>
        <AddSocMaster onClose={handleClose}/>
      </CustomModal>
      <CustomModal isOpen={showUpdate} onClose={handleClose}>
        <AddSocMaster initialData={update} onClose={handleClose}/>
      </CustomModal>
    </div>
  );
};

export default SocMaster;
