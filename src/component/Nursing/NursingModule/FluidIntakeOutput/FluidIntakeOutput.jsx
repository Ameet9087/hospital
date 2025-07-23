import React, { useEffect, useState } from "react";
import "./FluidIntakeOutput.css";
import { useSelector } from "react-redux";
import { API_BASE_URL } from "../../../api/api";
import axios from "axios";
import CustomModal from "../../../../CustomModel/CustomModal";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
import { toast } from "react-toastify";
const FluidIntakeOutput = ({ ipAdmission }) => {
  const [loading, setLoading] = useState(false);
  const [isViewClicked, setIsActiveClicked] = useState(false);
  const patientData = useSelector((state) => state.patient?.patientData);
  const [intakeDataList, setIntakeDataList] = useState([]);
  const [outputDataList, setOutputDataList] = useState([]);

  const fetchFluidIntakeOutputData = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/fluid-intake-output/admitted/${ipAdmission.ipAdmmissionId}`
      );
      const data = await response.json();

      const separatedData = data.map((item) => ({
        intake: {
          time: item.time,
          ivFluidType: item.ivFluidType,
          ivFluidVolume: item.ivFluidVolume,
          bloodType: item.bloodType,
          bloodVolumeInMl: item.bloodVolumeInMl,
          feedType: item.feedType,
          feedVolumeInMl: item.feedVolumeInMl,
          drugType: item.drugType,
          drugTypeInMl: item.drugTypeInMl,
          irrigation: item.irrigation,
          poType: item.poType,
          poVolumeInMl: item.poVolumeInMl,
          ngType: item.ngType,
          ngInMl: item.ngInMl,
          otherType: item.otherType,
          otherVolumeInMl: item.otherVolumeInMl,
          totalIntake: item.totalIntake,
          remarks: item.remarks,
          addedDate: item.dateOfCapturing,
        },
        output: {
          time: item.time,
          addedDate: item.dateOfCapturing,
          urineFoleyInMl: item.urineFoleyInMl,
          urineNaturalInMl: item.urineNaturalInMl,
          drainRtInMl: item.drainRtInMl,
          drain1InMl: item.drain1InMl,
          drain2Type: item.drain2Type,
          drain2InMl: item.drain2InMl,
          drain3Type: item.drain3Type,
          drain3InMl: item.drain3InMl,
          faecesType: item.faecesType,
          faecesVilumeInMl: item.faecesVilumeInMl,
          ngEmesisType: item.ngEmesisType,
          ngEmesisVolumeInMl: item.ngEmesisVolumeInMl,
          otherType2: item.otherType2,
          otherTypeVolumeInMl: item.otherTypeVolumeInMl,
          totalFluidOutput: item.totalFluidOutput,
        },
      }));

      // Separate intake and output lists
      setIntakeDataList(separatedData.map((item) => item.intake));
      setOutputDataList(separatedData.map((item) => item.output));
    } catch (error) {
      console.error("Error fetching fluid intake/output data:", error);
    }
  };

  useEffect(() => {
    fetchFluidIntakeOutputData();
  }, []);

  if (!patientData && !ipAdmission) {
    return <div>Loading patient data...</div>;
  }
  const [formData, setFormData] = useState({
    fluidIntakeOutputId: 1,
    time: "",
    ivFluidType: "",
    ivFluidVolume: "",
    bloodType: "",
    bloodVolumeInMl: "",
    feedType: "",
    feedVolumeInMl: "",
    drugType: "",
    drugTypeInMl: "",
    irrigation: "",
    poType: "",
    poVolumeInMl: "",
    ngType: "",
    ngInMl: "",
    otherType: "",
    otherVolumeInMl: "",
    totalIntake: "",
    remarks: "",
    urineFoleyInMl: "",
    urineNaturalInMl: "",
    drainRtInMl: "",
    drain1Type: "",
    drain1InMl: "",
    drain2Type: "",
    drain2InMl: "",
    drain3Type: "",
    drain3InMl: "",
    faecesType: "",
    faecesVilumeInMl: "",
    ngEmesisType: "",
    ngEmesisVolumeInMl: "",
    otherType2: "",
    otherTypeVolumeInMl: "",
    totalFluidOutput: "",
    totalIntake1: "",
    totalOutPut: "",
    balance: "",
    dateOfCapturing: new Date().toISOString().split("T")[0],
    ipAdmissionDTO: {
      ipAdmmissionId:
        patientData?.ipAdmmissionId || ipAdmission?.ipAdmmissionId,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Form Data to Submit:", formData);
      const response = await axios.post(
        `${API_BASE_URL}/fluid-intake-output/save`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Form Data Submitted:", response.data);
      setFormData({
        fluidIntakeOutputId: 1,
        time: "",
        ivFluidType: "",
        ivFluidVolume: "",
        bloodType: "",
        bloodVolumeInMl: "",
        feedType: "",
        feedVolumeInMl: "",
        drugType: "",
        drugTypeInMl: "",
        irrigation: "",
        poType: "",
        poVolumeInMl: "",
        ngType: "",
        ngInMl: "",
        otherType: "",
        otherVolumeInMl: "",
        totalIntake: "",
        remarks: "",
        urineFoleyInMl: "",
        urineNaturalInMl: "",
        drainRtInMl: "",
        drain1Type: "",
        drain1InMl: "",
        drain2Type: "",
        drain2InMl: "",
        drain3Type: "",
        drain3InMl: "",
        faecesType: "",
        faecesVilumeInMl: "",
        ngEmesisType: "",
        ngEmesisVolumeInMl: "",
        otherType2: "",
        otherTypeVolumeInMl: "",
        totalFluidOutput: "",
        totalIntake1: "",
        totalOutPut: "",
        balance: "",
      });
      fetchFluidIntakeOutputData();
      toast.success("Data Submitted Successfully!");
    } catch (error) {
      console.error("Error submitting form data:", error);
      toast.error("Failed to save data. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form>
        <div className="FluidIntakeOutput-form-container">
          <div className="FluidIntakeOutput-header">
            <span>Fluid Intake/Output</span>
            <button
              type="button"
              onClick={() => setIsActiveClicked(true)}
              className="FluidInTakeOutput-viewBtn"
            >
              view
            </button>
          </div>

          <div className="FluidIntakeOutput-section-content">
            <div className="FluidIntakeOutput-form-section">
              <div className="FluidIntakeOutput-Section-header">
                Fluid Intake
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Date of Capturing "}
                  type="date"
                  name="dateofcapturing"
                  value={formData.dateOfCapturing}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Time "}
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"IV Fluid Type"}
                  name="ivFluidType"
                  type="text"
                  value={formData.ivFluidType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"IV Fluid Volume"}
                  name="ivFluidVolume"
                  type="number"
                  min="0"
                  value={formData.ivFluidVolume}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Blood Type"}
                  name="bloodType"
                  type="text"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Blood Volume"}
                  name="bloodVolumeInMl"
                  type="number"
                  min="0"
                  value={formData.bloodVolumeInMl}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Feed Type"}
                  name="feedType"
                  type="text"
                  value={formData.feedType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Feed Volume"}
                  name="feedVolumeInMl"
                  type="number"
                  value={formData.feedVolumeInMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Drugs Type"}
                  name="drugType"
                  type="text"
                  value={formData.drugType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Drugs Volume"}
                  name="drugTypeInMl"
                  type="number"
                  value={formData.drugTypeInMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Irrigation"}
                  name="irrigation"
                  type="text"
                  value={formData.irrigation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"PO Type"}
                  name="poType"
                  type="text"
                  value={formData.poType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"PO Volume"}
                  name="poVolumeInMl"
                  type="number"
                  value={formData.poVolumeInMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"NG Type"}
                  name="ngType"
                  type="text"
                  value={formData.ngType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"NG Volume"}
                  name="ngInMl"
                  type="number"
                  value={formData.ngInMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Other Type"}
                  name="otherType"
                  type="text"
                  value={formData.otherType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Other Volume"}
                  name="otherVolumeInMl"
                  type="number"
                  value={formData.otherVolumeInMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Total Intake"}
                  name="totalIntake"
                  type="number"
                  value={formData.totalIntake}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingTextarea
                  label={"Remarks"}
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="FluidIntakeOutput-form-section">
              <div className="FluidIntakeOutput-Section-header">
                Fluid Output
              </div>

              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Urine Foley"}
                  name="urineFoleyInMl"
                  type="number"
                  value={formData.urineFoleyInMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Urine Natural"}
                  name="urineNaturalInMl"
                  type="number"
                  value={formData.urineNaturalInMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Drain RT"}
                  name="drainRtInMl"
                  type="number"
                  value={formData.drainRtInMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Drain 1 Type"}
                  name="drain1Type"
                  type="text"
                  value={formData.drain1Type}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Drain 1 Volume"}
                  name="drain1InMl"
                  type="number"
                  value={formData.drain1InMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Drain 2 Type"}
                  name="drain2Type"
                  type="text"
                  value={formData.drain2Type}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Drain 2 Volume"}
                  name="drain2InMl"
                  type="number"
                  value={formData.drain2InMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Drain 3 Type"}
                  name="drain3Type"
                  type="text"
                  value={formData.drain3Type}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Drain 3 Volume"}
                  name="drain3InMl"
                  type="number"
                  value={formData.drain3InMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Faeces Type"}
                  name="faecesType"
                  type="text"
                  value={formData.faecesType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Faeces Volume"}
                  name="faecesVilumeInMl"
                  type="number"
                  value={formData.faecesVilumeInMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"NG Emesis Type"}
                  name="ngEmesisType"
                  type="text"
                  value={formData.ngEmesisType}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"NG Emesis Volume"}
                  name="ngEmesisVolumeInMl"
                  type="number"
                  value={formData.ngEmesisVolumeInMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="FluidIntakeOutput-data">
                
                <FloatingInput
                  label={"Output Other Type"}
                  name="otherType2"
                  type="text"
                  value={formData.otherType2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Output Other Volume"}
                  name="otherTypeVolumeInMl"
                  type="number"
                  value={formData.otherTypeVolumeInMl}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <h3>Full Day</h3>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Total Fluid Output"}
                  name="totalFluidOutput"
                  type="number"
                  value={formData.totalFluidOutput}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Total Intake"}
                  name="totalIntake1"
                  type="number"
                  value={formData.totalIntake1}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>

              <div className="FluidIntakeOutput-data">
                <FloatingInput
                  label={"Total Output "}
                  name="totalOutPut"
                  type="number"
                  value={formData.totalOutPut}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="FluidIntakeOutput-data">
                <FloatingSelect
                  label={"Balance"}
                  name="balance"
                  value={formData.balance}
                  onChange={handleInputChange}
                  options={[
                    {label:"Selecte Balance"},
                    {value:"positive" ,label:"Positive"},
                    {value:"negative" ,label:"Negative"},
                    {value:"neutral" ,label:"Neutral"}
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="FluidIntakeOutput-navbar">
            <aside className="FluidIntakeOutput-navbar-btns">
              <button onClick={handleSubmit}>Save</button>
            </aside>
          </div>
        </div>
      </form>
      {isViewClicked && (
        <CustomModal
          isOpen={isViewClicked}
          onClose={() => setIsActiveClicked(false)}
        >
          <div className="FluidIntakeOutput-viewCon">
            <div className="FluidIntakeOutput-ViewHeader">
              <h3>Fluid Intake and Output Data</h3>
            </div>

            {/* Intake Table */}
            <h4>Fluid Intake</h4>
            <div className="FluidIntakeOutput-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Added Date</th>
                    <th>Time</th>
                    <th>IV Fluid Type</th>
                    <th>IV Fluid Volume</th>
                    <th>Blood Type</th>
                    <th>Blood Volume (ml)</th>
                    <th>Feed Type</th>
                    <th>Feed Volume (ml)</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {intakeDataList.length > 0 ? (
                    intakeDataList.map((intake, index) => (
                      <tr key={index}>
                        <td>{intake.addedDate}</td>
                        <td>{intake.time}</td>
                        <td>{intake.ivFluidType}</td>
                        <td>{intake.ivFluidVolume}</td>
                        <td>{intake.bloodType}</td>
                        <td>{intake.bloodVolumeInMl}</td>
                        <td>{intake.feedType}</td>
                        <td>{intake.feedVolumeInMl}</td>
                        <td>{intake.remarks}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9}></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Output Table */}
            <h4>Fluid Output</h4>
            <div className="FluidIntakeOutput-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Added Date</th>
                    <th>Time</th>
                    <th>Urine Foley (ml)</th>
                    <th>Urine Natural (ml)</th>
                    <th>Drain Rt (ml)</th>
                    <th>Drain 1 (ml)</th>
                    <th>Drain 2 Type</th>
                    <th>Drain 2 (ml)</th>
                    <th>Total Fluid Output</th>
                  </tr>
                </thead>
                <tbody>
                  {outputDataList.length > 0 ? (
                    outputDataList.map((output, index) => (
                      <tr key={index}>
                        <td>{output.addedDate}</td>
                        <td>{output.time}</td>
                        <td>{output.urineFoleyInMl}</td>
                        <td>{output.urineNaturalInMl}</td>
                        <td>{output.drainRtInMl}</td>
                        <td>{output.drain1InMl}</td>
                        <td>{output.drain2Type}</td>
                        <td>{output.drain2InMl}</td>
                        <td>{output.totalFluidOutput}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9}>no data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CustomModal>
      )}
    </>
  );
};

export default FluidIntakeOutput;
