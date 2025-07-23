import React, { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import "./CollectSample.css";
import SampleCodePopup from "./sampleCodePopup";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import { FloatingSelect } from "../../FloatingInputs";

const CollectSample = ({ sample, setSelectedSample }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTests, setSelectedTests] = useState({});
  const [selectedSpecimens, setSelectedSpecimens] = useState({});
  const [runNumber, setRunNumber] = useState({ part1: "7", part2: "5" });
  const [barcodeValue, setBarcodeValue] = useState("");
  const [selectedLabTestIds, setSelectedLabTestIds] = useState([]); // New state to track selected labTestIds
  const [sampleCollectionData, setSampleCollectionData] = useState([]);
  const xorEncrypt = (number) => {
    const randomNum = Math.floor(Math.random() * 10000);
    const combinedString = `${number}-${randomNum}`;
    return combinedString;
  };

  const fetchSampleCollection = async () => {
    const response = await axios.get(
      `${API_BASE_URL}/samples/labRequest/${sample.labRequestId}`
    );
    setSampleCollectionData(response.data);
  };

  useEffect(() => {
    fetchSampleCollection();
  }, []);

  const handleTestSelection = (index, labTestId) => {
    console.log(labTestId);

    setSelectedTests((prevSelectedTests) => {
      const newSelectedTests = { ...prevSelectedTests };
      newSelectedTests[index] = !newSelectedTests[index];

      setSelectedLabTestIds((prevSelectedLabTestIds) => {
        if (newSelectedTests[index]) {
          if (!prevSelectedLabTestIds.includes(labTestId)) {
            return [...prevSelectedLabTestIds, labTestId];
          }
        } else {
          return prevSelectedLabTestIds.filter((id) => id !== labTestId);
        }
        return prevSelectedLabTestIds;
      });

      if (newSelectedTests[index] && !selectedSpecimens[index]) {
        setSelectedSpecimens((prevSelectedSpecimens) => ({
          ...prevSelectedSpecimens,
          [index]: "Blood",
        }));
      }

      if (!newSelectedTests[index]) {
        setSelectedSpecimens((prevSelectedSpecimens) => {
          const newSpecimens = { ...prevSelectedSpecimens };
          delete newSpecimens[index];
          return newSpecimens;
        });
      }

      return newSelectedTests;
    });
  };

  const handleSpecimenChange = (index, specimenValue) => {
    setSelectedSpecimens((prevSpecimens) => ({
      ...prevSpecimens,
      [index]: specimenValue,
    }));
  };

  const handleCollectSample = async () => {
    if (selectedLabTestIds.length === 0) {
      alert("Please select at least one test.");
      return;
    }

    const labRequestId = sample.labRequestId;
    const encryptedBarcode = xorEncrypt(labRequestId);
    setBarcodeValue(encryptedBarcode);

    let labRequestObject = {
      status: "Pending",
      barcode: encryptedBarcode,
      runNumber: `${runNumber.part1} / ${runNumber.part2}`,
      labTestSampleMappings: selectedLabTestIds.map((labTestId) => ({
        labTest: { labTestId },
        specimenType: selectedSpecimens[labTestId] || "Blood",
        status: "Collected",
      })),
    };

    console.log(labRequestObject);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/samples/${labRequestId}`,
        labRequestObject
      );

      toast.success("Sample Collected Successfully");
      setIsPopupOpen(true);
    } catch (err) {
      toast.error("Error collecting sample:", err);
    }
  };

  const handleRunNumberChange = (part, value) => {
    setRunNumber((prevRunNumber) => ({
      ...prevRunNumber,
      [part]: value,
    }));
  };

  const isTestCollected = (labTestId) => {
    return sampleCollectionData[0]?.labTestSampleMappings?.some(
      (mapping) =>
        mapping.labTest?.labTestSettingId == labTestId &&
        mapping.status == "Collected"
    );
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
            {sample?.outPatient?.patient?.firstName ||
              sample?.inPatient?.patient?.firstName}{" "}
            {sample?.outPatient?.patient?.lastName ||
              sample?.inPatient?.patient?.lastName}
          </div>
          {sample?.outPatient && <div>Patient Type: Outpatient</div>}
          {sample?.inPatient && <div>Ward: Inpatient</div>}
          <div>
            Phone Number:{" "}
            {sample?.outPatient?.patient?.contactNumber ||
              sample?.inPatient?.patient?.contactNumber}
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
              {sample.labTests?.map((item, index) => {
                const testCollected = isTestCollected(item.labTestSettingId);
                console.log(testCollected);

                return (
                  <tr
                    key={index}
                    className={testCollected ? "bg-gray-200 opacity-50" : ""}
                  >
                    <td>{sample.requisitionDate}</td>
                    <td>
                      {sample.prescriber?.salutation}
                      {sample.prescriber?.doctorName}
                    </td>
                    <td>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={!!selectedTests[index]}
                          onChange={() =>
                            handleTestSelection(index, item.labTestSettingId)
                          }
                          disabled={testCollected} // Disable if test is collected
                        />
                        {item.labTestName}
                      </div>
                    </td>
                    <td>No</td>
                    <td>
                      <FloatingSelect
                      label={"Specimen"}
                      onChange={(e) =>
                        handleSpecimenChange(index, e.target.value)
                      }
                      value={selectedSpecimens[index] || "Blood"}
                      options={[{value:"",label:""},
                        {value:"Blood",label:"Blood"},
                        {value:"Urine",label:"Urine"},
                        {value:"Saliva",label:"Saliva"},
                        {value:"Stool",label:"Stool"}, 
                      ]}
                      />
                    </td>
                    <td>Normal</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="collectsample-run-number mt-4 flex items-center">
          <span>
            {sample?.outPatient != null ? "InPatient" : "OutPatient"} (Normal)
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
          className="collectsample-button "
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
          runNumber={runNumber}
          barcodeValue={barcodeValue}
        />
      )}
    </div>
  );
};

export default CollectSample;
