
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./SampleTable.css";
import CustomModal from "../../../CustomModel/CustomModal";
import SampleTestCard from "./SampleTableEdit";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
const HIMSSampleDataTable = () => {
  const [data, setData] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  // Sufiyan_HIMSSampleDataTable_24/09_Start
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/blood-testing/get-all-tests`);
        console.log(response.data)
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        setLoading(false);
      }
    };

    // Sufiyan_HIMSSampleDataTable_24/09_End

    fetchData();
  }, []);


  const handleEditClick = (test) => {
    setSelectedTest(test);
    setModalOpen(true);
  };


  const closeModal = () => {
    setModalOpen(false);
    setSelectedTest(null);
  };




  return (
    <div className="HIMSSampleDataTable-container">
      <h2 className="HIMSSampleDataTable-title"><i className="fa-solid fa-star-of-life"></i>Sample Data</h2>

      <div className="HIMSSampleDataTable-table-wrapper">
        <table ref={tableRef}>
          <thead>
            <tr >
              {[
                "test_id",
                "test_type",
                "result",
                "remarks",
                "tested_by",
                "Edit"
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.test_id}>
                {/* <td>{item.test_id}</td> */}
                <td>{item.testId}</td>
                {/* <td>{item.test_date}</td> */}
                <td>{item.testType}</td>
                <td>{item.result}</td>
                <td>{item.remarks}</td>
                <td>{item.testedBy}</td>
                <td>
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>

        <CustomModal isOpen={isModalOpen} onClose={closeModal}>
          <SampleTestCard testData={selectedTest} onClose={closeModal} />
        </CustomModal>
      </div>


    </div>
  );
};

export default HIMSSampleDataTable;


