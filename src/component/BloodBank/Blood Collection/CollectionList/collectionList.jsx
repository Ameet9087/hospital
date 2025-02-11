import React, { useEffect, useState ,useRef} from "react";
// import './collectionlist.css';
import "./collectionList.css";
import { API_BASE_URL } from "../../../api/api";
import CustomModal from "../../../../CustomModel/CustomModal";
import BloodTestingPopup from "./BloodTestingPage";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
function Colletionlist() {
  const [patients, setPatients] = useState([]);
  const [showTest, setShowTest] = useState(false);
  const [selectedCollectionId, setSelectedCollectionId] = useState(null);
 const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/basic-info`);
        if (response.ok) {
          const data = await response.json();
          setPatients(data);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPatients();
  }, []);
  const handleClosePopup = () => {
    setShowTest(false);
  };
  return (
    <div className="collection-list-container">
      <h2>Blood Collection List</h2>
      <table ref={tableRef}>
        <thead>
          <tr>
            {[
              "Name",
              "Blood Group",
              "Phone",
              "Email",
              "Collection Date",
              "Collection Site",
              "Action",
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
          {patients.map((patient) => (
            <tr key={patient.infoId}>
              <td>{patient.fullName}</td>
              <td>{patient.bloodTypeInfo.bloodGroup}</td>
              <td>{patient.contactNumber}</td>
              <td>{patient.emailAddress}</td>
              <td>{patient.bloodCollectionDetails.collectionDateTime}</td>
              <td>{patient.bloodCollectionDetails.collectionSite}</td>
              <td>
                <button
                  className="bloodbankrequest-submit-btn"
                  onClick={() => {
                    setSelectedCollectionId(patient.infoId);
                    setShowTest(true);
                  }}
                >
                  Test
                </button>
              </td>
            </tr>
          ))}

          {showTest && (
            <CustomModal onClose={() => setShowTest(false)} isOpen={showTest}>
              <BloodTestingPopup
                collectionId={selectedCollectionId}
                onClose={handleClosePopup}
              />
            </CustomModal>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Colletionlist;
