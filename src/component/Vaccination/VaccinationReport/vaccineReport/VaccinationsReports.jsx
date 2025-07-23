import React, { useState, useEffect, useRef } from "react";
import "./Vaccinationreports.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../api/api";
import FloatingSelect from "../../../../FloatingInputs/FloatingSelect";


function VaccinationsReports() {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownDate, setIsDropdownDate] = useState(false);
  const [fromDate, setFromDate] = useState("2024-08-12");
  const [toDate, setToDate] = useState("2024-08-12");
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rawPatients, setRawPatients] = useState([]); // Store unfiltered data
  const [filteredPatients, setFilteredPatients] = useState([]); // Store filtered data
  const [dataFetched, setDataFetched] = useState(false);

  const vaccines = ["BCG", "DPT", "Rotavirus", "HBV", "IPV", "OPV", "PCV"];
  const genders = ["Male", "Female", "Other"];

  const fetchData = () => {
    // Construct the query parameters for filtering
    const genderParam = selectedGender
      ? `gender=${encodeURIComponent(selectedGender)}`
      : "";
    const vaccineParam =
      selectedVaccines.length > 0
        ? `vaccines=${encodeURIComponent(selectedVaccines.join(","))}`
        : "";
    const fromDateParam = fromDate
      ? `fromDate=${encodeURIComponent(fromDate)}`
      : "";
    const toDateParam = toDate ? `toDate=${encodeURIComponent(toDate)}` : "";

    // Combine all parameters into a query string
    const queryParams = [genderParam, vaccineParam, fromDateParam, toDateParam]
      .filter((param) => param) // Remove empty parameters
      .join("&");

    // Fetch the patient data from the API with filters applied
    fetch(`${API_BASE_URL}/vaccinations/allVaccine?${queryParams}`)
      .then((response) => response.json())
      .then((patientsData) => {
        setRawPatients(patientsData); // Store raw unfiltered data
        setDataFetched(true);
        applyFilters(patientsData); // Apply filters to the fetched data
      })
      .catch((error) => console.error("Error fetching patient data:", error));
  };

  const applyFilters = (data) => {
    const resultPatients = data
      .map((patient) => {
        // Filter doses directly in the data
        const doses =
          patient.vaccinationDoses?.filter(
            (dose) =>
              (!fromDate ||
                new Date(dose.vaccinationDate) >= new Date(fromDate)) &&
              (!toDate || new Date(dose.vaccinationDate) <= new Date(toDate)) &&
              (selectedVaccines.length === 0 ||
                selectedVaccines.includes(dose.vaccineName))
          ) || [];

        return {
          ...patient,
          doses,
        };
      })
      .filter((patient) => {
        // Filter by gender (if selected)
        return !selectedGender || patient.gender === selectedGender;
      });

    setFilteredPatients(resultPatients); // Update filtered data
  };

  // UseEffect to refetch data when filters change or to apply filters after fetch
  useEffect(() => {
    if (dataFetched) {
      applyFilters(rawPatients); // Re-apply filters when the filters change
    }
  }, [selectedVaccines, selectedGender, fromDate, toDate]); // Listen to changes in filters

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleDashClick = () => {
    setIsDropdownDate(!isDropdownDate);
  };

  const handleOptionClick = (option) => {
    const currentDate = new Date();
    let newFromDate = new Date();

    if (option === "Last 1 Week") {
      newFromDate.setDate(currentDate.getDate() - 7);
    } else if (option === "Last 1 Month") {
      newFromDate.setMonth(currentDate.getMonth() - 1);
    } else if (option === "Last 3 Months") {
      newFromDate.setMonth(currentDate.getMonth() - 3);
    }

    setFromDate(newFromDate.toISOString().split("T")[0]);
    setToDate(currentDate.toISOString().split("T")[0]);
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => setSearchTerm(e.target.value);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedVaccines(vaccines);
    } else {
      setSelectedVaccines([]);
    }
  };

  const handleVaccineSelect = (vaccine) => {
    if (selectedVaccines.includes(vaccine)) {
      setSelectedVaccines(selectedVaccines.filter((v) => v !== vaccine));
    } else {
      setSelectedVaccines([...selectedVaccines, vaccine]);
    }
  };

  const handleGenderChange = (e) => setSelectedGender(e.target.value);

  const filteredVaccines = vaccines.filter((vaccine) =>
    vaccine.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => {
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Print</title></head><body>");
    printWindow.document.write(
      `<table border=1 style="border-collapse:collapse">${
        document.querySelector(".vaccinationsReports-table").innerHTML
      }</table>`
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="vaccinationsReports-main">
      <form className="">
        <div className="vaccinationsReports-header">
          <h4>Vaccination Details</h4>
          <div className="vaccinationsReports-dropfilter">
          <FloatingSelect
  label={"Select Gender"}
  value={selectedGender}
  onChange={handleGenderChange}
  options={[
    { value: "", label: "--All Gender--" },
    ...genders.map((gender) => ({
      value: gender,
      label: gender,
    })),
  ]}
/>


            <div
              className="vaccinationsReports__dropdown"
              onClick={toggleDropdown}
            >
              <span>--Select Vaccine--</span>
              <span
                className={`vaccinationsReports__arrow ${
                  isDropdownOpen ? "open" : ""
                }`}
              >
                ▼
              </span>
            </div>
            {isDropdownOpen && (
              <div className="vaccinationsReports__content">
                <label className="vaccinationsReports__selectAll">
                  <input
                    type="checkbox"
                    checked={selectedVaccines.length === vaccines.length}
                    onChange={handleSelectAll}
                  />
                  Select All
                </label>
                <div className="vaccinationsReports__search">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
                <div className="vaccinationsReports__list">
                  {filteredVaccines.map((vaccine) => (
                    <label key={vaccine} className="vaccinationsReports__item">
                      <input
                        type="checkbox"
                        checked={selectedVaccines.includes(vaccine)}
                        onChange={() => handleVaccineSelect(vaccine)}
                      />
                      {vaccine}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="vaccinationsReports-form">
          <div className="vaccinationsReports-form-input-group">
            <label>From:</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <label>To:</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
            <button
              type="button"
              className="vaccinationsReports-dash-btn"
              onClick={handleDashClick}
            >
           -
            </button>
            {isDropdownDate && (
              <div className="vaccinationsReports-dropdown">
                <div onClick={() => handleOptionClick("Last 1 Week")}>
                  Last 1 Week
                </div>
                <div onClick={() => handleOptionClick("Last 1 Month")}>
                  Last 1 Month
                </div>
                <div onClick={() => handleOptionClick("Last 3 Months")}>
                  Last 3 Months
                </div>
              </div>
            )}
            
          </div>
        </div>
      </form>

      <div className="vaccinationsReports-search">
        <div className="vaccinationsReports-search-bar">
          
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
          <i className="fas fa-search"></i>
        </div>
        <div className="vaccinationsReports-results">
          <span>Showing {filteredPatients?.length} results</span>
          <button className="vaccinationsReports-export-btn">Export</button>
          <button
            className="vaccinationsReports-print-btn"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table className="vaccinationsReports-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Vacc. Date",
                "Vacc. Regd. No.",
                "Baby's Name",
                "Age/Sex",
                "Mother's Name",
                "Father's Name",
                "Date Of Birth",
                "Religion",
                "Address",
                "Phone Number",
                "Vacc. Name",
                "Dose",
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
            {dataFetched ? (
              filteredPatients ? (
                filteredPatients.map((patient, index) => (
                  <tr key={index}>
                    <td>
                      {patient?.vaccinationDoses &&
                      patient.vaccinationDoses.length > 0
                        ? patient.vaccinationDoses[
                            patient.vaccinationDoses.length - 1
                          ].vaccinationDate
                        : ""}
                    </td>
                    <td>
                      {patient?.vaccinationDoses &&
                      patient.vaccinationDoses.length > 0
                        ? patient.vaccinationDoses[
                            patient.vaccinationDoses.length - 1
                          ].doseId
                        : ""}
                    </td>
                    <td>{patient.babyName}</td>
                    <td>{`${patient.age} ${patient.ageUnit}`}</td>
                    <td>{patient.motherName}</td>
                    <td>{patient.fatherName}</td>
                    <td>{patient.dateOfBirth}</td>
                    <td>{patient.religion}</td>
                    <td>{patient.address}</td>
                    <td>{patient.phoneNumber}</td>
                    <td>
                      {patient?.vaccinationDoses &&
                      patient.vaccinationDoses.length > 0
                        ? patient.vaccinationDoses[
                            patient.vaccinationDoses.length - 1
                          ].vaccineName
                        : ""}
                    </td>
                    <td>
                      {patient?.vaccinationDoses &&
                      patient.vaccinationDoses.length > 0
                        ? patient.vaccinationDoses[
                            patient.vaccinationDoses.length - 1
                          ].vaccinationDose
                        : ""}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="vaccinationsReports-no-rows">
                    No Rows To Show
                  </td>
                </tr>
              )
            ) : (
              <tr>
                <td colSpan="13" className="vaccinationsReports-loading">
                  Loading...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VaccinationsReports;
