import React, { useState } from "react";
// import './ipviewDetail.css';

const IpViewDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientName, setPatientName] = useState("ANGEL VARGAS MONTERO");
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [modals, setModals] = useState({
    newInternModal: false,
    estimateBillModal: false,
    addDepositModal: false,
    itemDiscountModal: false,
    editItemModal: false,
    partialClearanceModal: false,
  });

  const openbtnModal = (modalName) => {
    setModals((prevState) => ({
      ...prevState,
      [modalName]: true,
    }));
  };

  // Function to close a specific modal
  const closebtnModal = (modalName) => {
    setModals((prevState) => ({
      ...prevState,
      [modalName]: false,
    }));
  };

  return (
    <div>
      <div className="ip-view-detail-heading">
        <div>
          <h2>Inpatient Billing</h2>
        </div>
        <div>
          <label className="ip-view-membership-lable">Membership:</label>
          <select className="ip-view-membership-select">
            <option>AStar</option>
            <option>Britam</option>
            <option>General</option>
          </select>
        </div>
        <div>
          <label className="ip-view-membership-lable">Price Category:</label>
          <select className="ip-view-membership-select">
            <option>Normal</option>
            <option>General</option>
            <option>NHIF</option>
            <option>NHIF Capitation</option>
          </select>
        </div>
      </div>
      <div className="billing-page">
        <div className="header-section">
          <div class="navbar">
            <button class="back">Back</button>
            <button
              className="ipviewdetail-new intern-btn new-item"
              onClick={() => openbtnModal("newInternModal")}
            >
              New Item
            </button>
            {modals.newInternModal && (
              <div className="modal-overlay ipviewdetail-new-intern-btn">
                <div className="modal-content-ipviewdetail-new-intern-btn">
                  <h2 className="ipviewdetail-new-intern-btn-h2">
                    {patientName} ({patientId})
                  </h2>

                  <div className="form-groupipviewdetail-newintern-btn">
                    <label className="labelipviewdetail-newintern-btn">
                      Membership *:
                    </label>
                    <select className="selectlabelipviewdetail-newintern-btn">
                      <option>BRITAM</option>
                    </select>
                  </div>

                  <div className="form-groupipviewdetail-newintern-btn">
                    <label className="labelipviewdetail-newintern-btn">
                      Price Category:
                    </label>
                    <select className="selectlabelipviewdetail-newintern-btn">
                      <option>Normal</option>
                    </select>
                  </div>

                  <table className="tableipviewdetail-newintern-btn">
                    <thead>
                      <tr>
                        <th className="tablehead-ipviewdetail-newintern-btn">
                          Department
                        </th>
                        <th className="tablehead-ipviewdetail-newintern-btn">
                          Prescriber
                        </th>
                        <th className="tablehead-ipviewdetail-newintern-btn">
                          Performer
                        </th>
                        <th className="tablehead-ipviewdetail-newintern-btn">
                          ItemName
                        </th>
                        <th className="tablehead-ipviewdetail-newintern-btn">
                          Qty
                        </th>
                        <th className="tablehead-ipviewdetail-newintern-btn">
                          Price
                        </th>
                        <th className="tablehead-ipviewdetail-newintern-btn">
                          VAT
                        </th>
                        <th className="tablehead-ipviewdetail-newintern-btn">
                          Tax Amt
                        </th>
                        <th className="tablehead-ipviewdetail-newintern-btn">
                          SubTotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="tabledata-ipviewdetail-newintern-btn">
                          <input
                            className="ipviewdetail-newintern-btn-input"
                            type="text"
                            placeholder="Enter Department"
                          />
                        </td>
                        <td className="tabledata-ipviewdetail-newintern-btn">
                          <input
                            className="ipviewdetail-newintern-btn-input"
                            type="text"
                            placeholder="Enter Name"
                          />
                        </td>
                        <td className="tabledata-ipviewdetail-newintern-btn">
                          <input
                            className="ipviewdetail-newintern-btn-input"
                            type="text"
                            placeholder="Enter Name"
                          />
                        </td>
                        <td className="tabledata-ipviewdetail-newintern-btn">
                          <input
                            className="ipviewdetail-newintern-btn-input"
                            type="text"
                            placeholder="ENTER ITEM NAME"
                          />
                        </td>
                        <td className="tabledata-ipviewdetail-newintern-btn">
                          <input
                            className="ipviewdetail-newintern-btn-input"
                            type="number"
                            defaultValue={1}
                          />
                        </td>
                        <td className="tabledata-ipviewdetail-newintern-btn">
                          <input
                            className="ipviewdetail-newintern-btn-input"
                            type="number"
                            defaultValue={0}
                          />
                        </td>
                        <td className="tabledata-ipviewdetail-newintern-btn">
                          <input
                            className="ipviewdetail-newintern-btn-input"
                            type="number"
                            defaultValue={13}
                          />
                        </td>
                        <td className="tabledata-ipviewdetail-newintern-btn">
                          <input
                            className="ipviewdetail-newintern-btn-input"
                            type="number"
                            defaultValue={0}
                          />
                        </td>
                        <td className="tabledata-ipviewdetail-newintern-btn">
                          <input
                            className="ipviewdetail-newintern-btn-input"
                            type="number"
                            defaultValue={0}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="total-ipviewdetail-new-intern-btn">
                    Total Amount: 0<div>In Words : Only.</div>
                  </div>

                  <div className="button-group-ipviewdetail-new-intern-btn">
                    <button
                      onClick={() => closebtnModal("newInternModal")}
                      className="ipviewdetail-new-intern-btn-new-item-close-button"
                    >
                      Cancle
                    </button>
                    <button className="print-slip-ipviewdetail-new-intern-btn">
                      Print Slip
                    </button>
                    <button className="request-ipviewdetail-new-intern-btn">
                      Request
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button
              class="estimation-bill"
              onClick={() => openbtnModal("estimateBillModal")}
            >
              Estimation Bill
            </button>
            {modals.estimateBillModal && (
              <div className="estimate_bill_modal">
                <div className="estimate_bill_modal_content">
                  <button
                    onClick={() => closebtnModal("estimateBillModal")}
                    className="ipviewdetail-new-intern-btn-new-item-close-button"
                  >
                    Cancel
                  </button>
                  <h2>ESTIMATION | PROVISIONAL BILL</h2>
                  <div className="estimate_bill_details">
                    <p>HOSPITAL NO: </p>
                    <p>PATIENT'S NAME: </p>
                    <p>AGE/SEX: </p>
                    <p>ADDRESS: </p>
                    <p>DOA:</p>
                    <p>DOD: </p>
                    <p>ROOM CATEGORY:</p>
                  </div>
                  <table className="estimate_bill_table">
                    <thead>
                      <tr>
                        <th>S.N.</th>
                        <th>Service Department</th>
                        <th>SubTotal</th>
                        <th>Discount</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {patientData.services.map((service, index) => ( */}
                      <tr>
                        <td>1</td>
                        <td>cse</td>
                        <td>subtotal</td>
                        <td>5%</td>
                        <td>2000</td>
                      </tr>
                      {/* ))} */}
                    </tbody>
                  </table>
                  <div className="estimate_bill_summary">
                    <p>SUBTOTAL: subtotal</p>
                    <p>DISCOUNT: discount</p>
                    <p>GRAND TOTAL: grandTota</p>
                    <p>DEPOSIT: deposit</p>
                    <p>TO BE PAID: toBePaid</p>
                  </div>
                  <button className="estimate_bill_print">Print</button>
                  <div className="estimate_bill_printer_select">
                    <select
                      // value={selectedPrinter}
                      onChange={(e) => setSelectedPrinter(e.target.value)}
                    >
                      <option value="">Select Printer</option>
                      <option value="printer1">Printer 1</option>
                      <option value="printer2">Printer 2</option>
                    </select>
                    <button className="estimate_bill_ok">OK</button>
                  </div>
                </div>
              </div>
            )}

            <button class="add-deposit">Add Deposit</button>
            <button class="item-discount">Item Discount</button>
          </div>
          <div className="patient-details">
            <div className="detail-container">
              <div className="detail-column">
                <div className="detail-item">
                  <b>Ip Number:</b> H240023
                </div>
                <div className="detail-item">
                  <b>Ward/Bed:</b> ICU / 02
                </div>
                <div className="detail-item">
                  <b>Total Days:</b> 22
                </div>
                <div className="detail-item">
                  <b>Admitting Doc:</b> Dr. VICTOR OCHIENG OKECH
                </div>
              </div>

              <div className="detail-column">
                <div className="detail-item">
                  <b>Adm. Date:</b> 2024-07-30 11:06 AM
                </div>
                <div className="detail-item">
                  <b>Disch. Date:</b> <input type="date" value="2024-08-21" />{" "}
                  <input type="time" value="16:06" />
                </div>
                <div className="detail-item">
                  <b>Credit Amount:</b> 0
                </div>
              </div>
            </div>
            <div className="remarks-section">
              <b>Patient Remark</b>
              <input type="text" placeholder="Patient Remarks" />
              <button className="ipviewupdatebtn">Update</button>
            </div>
          </div>

          <div className="table-section">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
            </div>
            <table className="billing-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Receipt...</th>
                  <th>Department</th>
                  <th>ItemName</th>
                  <th>Qty.</th>
                  <th>Sub Total</th>
                  <th>DiscAmt</th>
                  <th>Performer</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2024-08-18</td>
                  <td>PR/131</td>
                  <td>Biochemistry</td>
                  <td>CREATININE</td>
                  <td>1</td>
                  <td>1200</td>
                  <td></td>
                  <td></td>
                  <td>
                    <button onClick={openModal}>Edit</button>
                  </td>
                </tr>
                {/* More rows */}
              </tbody>
            </table>
          </div>
          {/* Modal */}
          {isModalOpen && (
            <div className="modal fade-in">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Edit Item</h5>
                  <button onClick={closeModal} className="close-button">
                    ×
                  </button>
                </div>
                <div className="modal-body">
                  <div className="detail-container">
                    <div className="detail-column">
                      <div className="detail-item">
                        <b>Ip Number:</b> H240023
                      </div>
                      <div className="detail-item">
                        <b>Ward/Bed:</b> ICU / 02
                      </div>
                      <div className="detail-item">
                        <b>Total Days:</b> 22
                      </div>
                      <div className="detail-item">
                        <b>Admitting Doc:</b> Dr. VICTOR OCHIENG OKECH
                      </div>
                    </div>

                    <div className="detail-column">
                      <div className="detail-item">
                        <b>Adm. Date:</b> 2024-07-30 11:06 AM
                      </div>
                      <div className="detail-item">
                        <b>Disch. Date:</b>{" "}
                        <input type="date" value="2024-08-21" />{" "}
                        <input type="time" value="16:06" />
                      </div>
                      <div className="detail-item">
                        <b>Credit Amount:</b> 0
                      </div>
                    </div>
                  </div>
                  <div className="remarks-section">
                    <b>Patient Remark</b>
                    <input type="text" placeholder="Patient Remarks" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button className="save-button">Save</button>
                  <button onClick={closeModal} className="cancel-button">
                    Cancel Item
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="billing-detail-section">
          <h3>Billing Detail </h3>
          <div className="detail-item">
            <b>Sub Total</b> <b>5,700</b>
          </div>
          <div className="detail-item">
            <b>Discount %</b> <input type="number" />
          </div>
          <div className="detail-item">
            <b>Discount Amt.</b> <input type="number" />
          </div>
          <div className="detail-item">
            <b>Billing Total</b> <span>5,700</span>
          </div>
          <div className="detail-item">
            <input type="checkbox" /> Show Other Currency
          </div>
          <div className="detail-item">
            <b>Pharmacy Total</b> <b>0</b>
          </div>
          <div className="detail-item">
            <b>Grand Total</b> <b>5,700</b>
          </div>
          <div className="detail-item">
            <b>Deposit Balance</b> <b>2,722</b>
          </div>
          <div className="detail-item">
            <b>Payment Options:</b>
            <select>
              <option>Cash</option>
              <option>Credit</option>
              <option>Other</option>
            </select>
          </div>
          <div className="detail-item">
            <b>Credit Organization:</b>
            <select>
              <option>--Select Credit--</option>
              <option>NHIF Capitation</option>
              <option>NHIF General</option>
              <option>MTIBA</option>
            </select>
          </div>
          <div className="detail-item">
            <b>Billing Remarks:</b>
            <input type="text" />
          </div>
          <div className="alert-msg">
            *There will be no deposit deduct/deposit return for CREDIT bill.
          </div>
          <button className="discharge-btn">Discharge</button>
        </div>
      </div>
    </div>
  );
};

export default IpViewDetail;
