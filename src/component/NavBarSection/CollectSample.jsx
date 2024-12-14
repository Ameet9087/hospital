import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import "./CollectSample.css";
import SampleCodePopup from "./sampleCodePopup";
import axios from "axios";
import { API_BASE_URL } from "../api/api";

const CollectSample = ({ sample }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTests, setSelectedTests] = useState({});
  const [selectedSpecimens, setSelectedSpecimens] = useState({});
  const [runNumber, setRunNumber] = useState({ part1: "7", part2: "5" });
  const [barcodeValue, setBarcodeValue] = useState("");

  const xorEncrypt = (number) => {
    const randomNum = Math.floor(Math.random() * 10000);
    const combinedString = `${number}-${randomNum}`;

    return combinedString;
  };

  const handleTestSelection = (testName) => {
    setSelectedTests((prevSelectedTests) => ({
      ...prevSelectedTests,
      [testName]: !prevSelectedTests[testName],
    }));
  };

  const handleSpecimenChange = (testId, specimenValue) => {
    setSelectedSpecimens((prevSpecimens) => ({
      ...prevSpecimens,
      [testId]: specimenValue,
    }));
  };

  const handleCollectSample = async () => {
    // Collect selected tests
    const selectedTestNames = Object.keys(selectedTests).filter(
      (testName) => selectedTests[testName]
    );
    if (selectedTestNames.length === 0) {
      alert("Please select at least one test.");
      return;
    }
    const labRequestId = sample.labRequestId;
    const encryptedBarcode = xorEncrypt(labRequestId);
    setBarcodeValue(encryptedBarcode);

    let labRequestObject = {
      status: "Active",
      sampleStatus: "Collected",
      sampleCollectedDate: new Date().toISOString().split("T")[0],
      sampleCollectedTime: new Date().toLocaleTimeString(),
      runNumber: `${runNumber.part1} / ${runNumber.part2}`,
      specimen: JSON.stringify(
        Object.keys(selectedTests)
          .filter((testName) => selectedTests[testName])
          .map(() => "blood")
      ),
      barcode: encryptedBarcode,
    };

    console.log(labRequestObject);

    try {0
      const response = await axios.put(
        `${API_BASE_URL}/lab-requests/update-sample/${sample.labRequestId}`,
        labRequestObject
      );

      if (response.status === 200) {
        console.log("Sample Collected");
        setIsPopupOpen(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRunNumberChange = (part, value) => {
    setRunNumber((prevRunNumber) => ({
      ...prevRunNumber,
      [part]: value,
    }));
  };

  return (
    <div className="collectsample-container bg-blue-50">
      <div className="collectsample-header bg-blue-100 p-4">
        <h1 className="collectsample-title text-xl font-bold">
          Collect Sample
        </h1>
        <div className="collectsample-alert bg-green-100 p-2 mt-2">
          Please verify the RUN Number and Tests carefully before collecting the
          sample.
        </div>
      </div>

      <div className="collectsample-content p-4">
        <div className="collectsample-info bg-gray-100 p-4 flex justify-between">
          <div>
            Patient Name:{" "}
            {sample.patientDTO?.firstName ||
              sample.newPatientVisitDTO?.firstName}{" "}
            {sample.patientDTO?.lastName || sample.newPatientVisitDTO?.lastName}
          </div>
          {sample.patientDTO && <div>Ward: Outpatient</div>}
          <div>
            Phone Number:{" "}
            {sample.patientDTO?.phoneNumber ||
              sample.newPatientVisitDTO?.phoneNumber}
          </div>
        </div>

        <div className="collectsample-table mt-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th>Requested On</th>
                <th>Prescribed By</th>
                <th>Select Test</th>
                <th>Is Outsourced?</th>
                <th>Specimen</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {sample.labTests?.map((item, index) => (
                <tr key={index}>
                  <td>{sample.requisitionDate}</td>
                  <td>
                    {sample.prescriber?.salutation}
                    {sample.prescriber?.firstName} {sample.prescriber?.lastName}
                  </td>
                  <td>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={!!selectedTests[item.labTestId]}
                        onChange={() => handleTestSelection(item.labTestId)}
                      />
                      {item.labTestName}
                    </div>
                  </td>
                  <td>No</td>
                  <td>
                    <select
                      className="border rounded"
                      onChange={(e) =>
                        handleSpecimenChange(item.labTestId, e.target.value)
                      }
                    >
                      <option value="Blood">Blood</option>
                      <option value="Urine">Urine</option>
                      <option value="Saliva">Saliva</option>
                      <option value="Stool">Stool</option>
                    </select>
                  </td>
                  <td>Normal</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="collectsample-run-number mt-4 flex items-center">
          <span>
            {sample.patientDTO != null ? "InPatient" : "OutPatient"} (Normal)
            Run Number:
          </span>
          <input
            type="text"
            value={runNumber.part1}
            className="border mx-2 w-16 text-center"
            onChange={(e) => handleRunNumberChange("part1", e.target.value)}
          />
          <span>/</span>
          <input
            type="text"
            value={runNumber.part2}
            className="border mx-2 w-16 text-center"
            onChange={(e) => handleRunNumberChange("part2", e.target.value)}
          />
          <RefreshCw size={16} className="text-blue-500 ml-2" />
        </div>

        <button
          className="collectsample-button mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          onClick={handleCollectSample}
        >
          Collect Sample
        </button>
      </div>

      {isPopupOpen && (
        <SampleCodePopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          data={sample}
          barcodeValue={barcodeValue}
        />
      )}
    </div>
  );
};

export default CollectSample;
