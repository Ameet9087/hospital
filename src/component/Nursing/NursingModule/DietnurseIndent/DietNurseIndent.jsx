import React, { useEffect, useState, useRef } from "react";
import "./DietNurseIndent.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";
const nurseIndent = ({ ipAdmission }) => {
  const [floors, setFloors] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState("");
  const [tableData, setTableData] = useState([]);

  const [formData, setFormData] = useState({
    mrno: "",
    ipno: "",
    patientName: "",
    age: "",
    sex: "",
    ward: "",
    roomBedNo: "",
    department: "",
    consultant: "",
    date: "",
    time: "",
    bloodSugarValues: "",
    urineAcetone: "",
  });
  const [packageTableRows, setPackageTableRows] = useState([
    {
      sn: 1,
      drug: "",
      dose: "",
      route: "",
      remarks: "",
    },
  ]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/floors`)
      .then((response) => {
        setFloors(response.data);
      })
      .catch((error) => {
        console.log("Error fetching floors" + error);
      });
  }, []);

  const handleSelectChange = async (event) => {
    const floorNumber = event.target.value;
    setSelectedFloor(floorNumber);

    if (floorNumber) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/diet-nurse-indent/by-floor/${floorNumber}`
        );
        setTableData(response.data);

        console.log(response.data + "aaaaaaaaaaaaaaa");
      } catch (error) {
        console.log("Error fetching data" + error);
      }
    }
  };
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const handleInputChange = (index, name, value) => {
    const updatedRows = [...packageTableRows];
    updatedRows[index] = {
      ...updatedRows[index],
      [name]: value,
    };
    setPackageTableRows(updatedRows);
  };
  const handleAddRow = () => {
    setPackageTableRows((prevRows) => [
      ...prevRows,
      {
        sn: prevRows.length + 1,
        drug: "",
        dose: "",
        route: "",
        remarks: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    setPackageTableRows((prevRows) => prevRows.filter((_, i) => i !== index));
  };
  return (
    <div className="nurse-indent-com-container">
      <div className="nurse-indent-com-header">
        <h4>Diet Nurse Indent</h4>
      </div>

      <div className="nurse-indent-com-form">
        <div className="nurse-indent-com-form-row">
          <div className="nurse-indent-com-form-group-1row">
            <div className="nurse-indent-com-form-group">
              <label htmlFor="selectFloor" className="me-2">
                Select Floors:
              </label>
              <select
                id="floorSelect"
                value={selectedFloor}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  --Selected Floor--
                </option>
                {floors.map((floor) => (
                  <option key={floor.id} value={floor.floorNumber}>
                    Floor {floor.floorNumber}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      {selectedFloor && <p>You selected: Floor {selectedFloor}</p>}

      {/* <h4>Diet Indent Nurse</h4> */}
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Actions",
                "SN",
                "MRNO",
                "IPNO",
                "Patient Name",
                "Age",
                "Sex",
                "Doctor Name",
                "Room No",
                "Room Type",
                "Bed No",
                "Diet Advised",
                "Diagnosis",
                "Comorbidities",
                "Remarks",
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
            {tableData.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="diabetic-chart-add-btn-table-actions">
                    <button
                      className="nurse-indent-com-add-btn"
                      onClick={handleAddRow}
                    >
                      Add
                    </button>
                    <button
                      className="nurse-indent-com-del-btn"
                      onClick={() => handleDeleteRow(index)}
                      disabled={tableData.length <= 1}
                    >
                      Del
                    </button>
                  </div>
                </td>
                <td>{index + 1}</td>
                <td>{item.ipAdmissionDTO?.patient?.patient?.uhid || "N/A"}</td>
                <td>{item.ipAdmissionDTO?.ipAdmmissionId || "N/A"}</td>
                <td>
                  {`${item.ipAdmissionDTO?.patient?.patient?.firstName || ""} ${item.ipAdmissionDTO?.patient?.patient?.middleName || ""
                    } ${item.ipAdmissionDTO?.patient?.patient?.lastName || ""}`}
                </td>
                <td>{item.ipAdmissionDTO?.patient?.patient?.age || "N/A"}</td>
                <td>
                  {item.ipAdmissionDTO?.patient?.patient?.gender || "N/A"}
                </td>
                <td>
                  {item.ipAdmissionDTO?.admissionUnderDoctorDetail
                    ?.consultantDoctor?.doctorName || "N/A"}
                </td>
                <td>
                  {item.ipAdmissionDTO?.roomDetails?.roomDTO?.roomNumber ||
                    "N/A"}
                </td>
                <td>
                  {item.ipAdmissionDTO?.roomDetails?.roomTypeDTO?.roomtype ||
                    "N/A"}
                </td>
                <td>
                  {item.ipAdmissionDTO?.roomDetails?.bedDTO?.bedNo || "N/A"}
                </td>
                <td>{item.dietAdvised || "N/A"}</td>
                <td>{item.diagnosis || "N/A"}</td>
                <td>{item.comorbidities || "N/A"}</td>
                <td>{item.remarks || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="nurse-indent-com-form-actions">
        <button className="nurse-indent-com-add-btn">Add</button>
      </div>
    </div>
  );
};

export default nurseIndent;
