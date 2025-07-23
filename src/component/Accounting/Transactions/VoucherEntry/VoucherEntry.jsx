import React, { useState } from "react";
import "./VoucherEntry.css";

const voucherTypes = [
  "Purchase Voucher",
  "Sales Voucher",
  "Journal Voucher",
  "Payment Voucher",
  "Receipt Voucher",
  "Contra Voucher",
  "Credit Note",
  "Debit Note",
  "Reverse Voucher",
  "Vendor Bill",
];

const VoucherEntry = () => {
  const [formState, setFormState] = useState({
    voucherType: "Journal Voucher",
    voucherNumber: "MV-JV-5",
    voucherDate: "2024-08-07",
    backDateEntry: false,
    copyFromOldVoucher: false,
    paymentMode: "Cash",
    entries: [
      {
        drCr: "Dr",
        code: "",
        ledger: "",
        drAmount: 0,
        crAmount: 0,
        description: "",
      },
    ],
    bankDetails: [
      {
        chequeNumber: "",
        chequeDate: "",
      },
    ],
  });

  const handleAddEntry = () => {
    setFormState((prevState) => ({
      ...prevState,
      entries: [
        ...prevState.entries,
        {
          drCr: "Dr",
          code: "",
          ledger: "",
          drAmount: 0,
          crAmount: 0,
          description: "",
        },
      ],
    }));
  };

  const handleRemoveEntry = (index) => {
    if (formState.entries > 1) {
      setFormState((prevState) => ({
        ...prevState,
        entries: prevState.entries.filter((_, i) => i !== index),
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormState((prevState) => ({
      ...prevState,
      [name]: updatedValue,
    }));
  };
  const handleEntryChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEntries = [...formState.entries];
    updatedEntries[index][name] = value;
    setFormState((prevState) => ({
      ...prevState,
      entries: updatedEntries,
    }));
  };

  const handleBankDetailChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBankDetails = [...formState.bankDetails];
    updatedBankDetails[index][name] = value;
    setFormState((prevState) => ({
      ...prevState,
      bankDetails: updatedBankDetails,
    }));
  };

  return (
    <>
      <form>
        <div className="voucher-entry-form">
          <div className="voucher-entry-form-row">
            <div className="voucher-entry-form-div">
              <input
                className="voucher-entry-checkbox"
                type="checkbox"
                id="BackDateEntry"
                name="backDateEntry"
                checked={formState.backDateEntry}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="BackDateEntry" className="voucher-entry-label">
                Back Date Entry
              </label>
            </div>
            <div className="voucher-entry-form-div">
              <label className="voucher-entry-label">
                Voucher Type:
                <select
                  className="voucher-entry-select"
                  name="voucherType"
                  value={formState.voucherType}
                  onChange={handleChange}
                >
                  {voucherTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="voucher-entry-form-div">
              <label className="voucher-entry-label">
                Voucher Number:
                <input
                  className="voucher-entry-input"
                  type="text"
                  name="voucherNumber"
                  readOnly
                  value={formState.voucherNumber}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="voucher-entry-form-div">
              <label className="voucher-entry-label">
                Voucher Date:
                <input
                  className="voucher-entry-input voucher-entry-input-border"
                  type="text"
                  name="voucherDate"
                  readOnly
                  value={formState?.voucherDate}
                />
              </label>
            </div>
            <div className="voucher-entry-form-div">
              <input
                className="voucher-entry-checkbox"
                type="checkbox"
                id="CopyFromOldVoucher"
                name="copyFromOldVoucher"
                checked={formState.copyFromOldVoucher}
                onChange={handleChange}
              />
              <br />
              <label
                htmlFor="CopyFromOldVoucher"
                className="voucher-entry-label"
              >
                Copy From Old Voucher
              </label>
            </div>
          </div>
        </div>

        {formState.backDateEntry && (
          <div className="voucher-entry-back-entry">
            <label className="voucher-entry-back-label">Voucher Date: </label>
            <select className="voucher-entry-back-select">
              {/* Add year options here */}
              <option>2024</option>
              <option>2023</option>
              {/* Add more years as needed */}
            </select>
            <input
              className="voucher-entry-back-input"
              type="date"
              name="voucherDate"
              value={formState.voucherDate}
              onChange={handleChange}
            />
          </div>
        )}

        {formState.copyFromOldVoucher && (
          <div className="voucher-entry-copy-voucher">
            <div className="voucher-entry-copy-voucher-date">
              <label className="voucher-entry-copy-voucher-label">
                Choose Fiscal Year:
              </label>
              <select className="voucher-entry-copy-select">
                <option>2024</option>
                <option>2023</option>
              </select>
              <input
                className="voucher-entry-copy-input"
                type="date"
                name="copyVoucherDate"
              />
            </div>
            <div className="voucher-entry-copy-voucher-number">
              <label className="voucher-entry-copy-voucher-label">
                Voucher Number:
              </label>
              <input
                className="voucher-entry-input"
                type="text"
                placeholder="Enter Voucher Number"
                name="newvouchernumber"
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {(formState.voucherType === "Payment Voucher" ||
          formState.voucherType === "Receipt Voucher") && (
          <>
            <div className="VE-voucher-type">
              <div className="VE-voucher-type-mode">
                <span>Payment Form: </span>
                <input
                  type="radio"
                  id="paymentCash"
                  name="paymentMode"
                  value="Cash"
                  checked={formState.paymentMode === "Cash"}
                  onChange={handleChange}
                />
                <label htmlFor="paymentCash" className="VE-voucher-type-label">
                  Cash
                </label>
                <input
                  type="radio"
                  id="paymentBank"
                  name="paymentMode"
                  value="Bank"
                  checked={formState.paymentMode === "Bank"}
                  onChange={handleChange}
                />
                <label htmlFor="paymentBank" className="VE-voucher-type-label">
                  Bank
                </label>
              </div>
              <div className="VE-voucher-type-given">
                {formState.voucherType === "Payment Voucher" ? (
                  <>
                    <span>Payment Given To: </span>
                    <input
                      type="text"
                      className="VE-voucher-type-input"
                      id="paymentGivenTo"
                      name="paymentGivenTo"
                      onChange={handleChange}
                    />
                  </>
                ) : (
                  <>
                    <span>Payment Received From: </span>
                    <input
                      type="text"
                      className="VE-voucher-type-input"
                      id="paymentReceived"
                      name="paymentReceived"
                      onChange={handleChange}
                    />
                  </>
                )}
              </div>
            </div>

            <table className="VE-voucher-type-table">
              <thead className="VE-voucher-type-tablehead">
                <tr>
                  <th>Code</th>
                  <th>Ledger (Main)</th>
                  {formState.paymentMode === "Bank" && (
                    <>
                      <th>Cheque Number</th>
                      <th>Cheque Date</th>
                    </>
                  )}
                  <th>Description</th>
                </tr>
              </thead>
              <tbody className="VE-voucher-type-tablebody">
                {formState.entries.map((entry, index) => (
                  <tr key={index} className="VE-voucher-type-row">
                    <td>
                      <input
                        className="VE-voucher-type-input"
                        type="text"
                        name="code"
                        placeholder="code"
                        value={entry.code}
                        onChange={(e) => handleEntryChange(index, e)}
                      />
                    </td>
                    <td>
                      <input
                        className="VE-voucher-type-input"
                        type="text"
                        name="ledger"
                        placeholder="Select Ledger"
                        value={entry.ledger}
                        onChange={(e) => handleEntryChange(index, e)}
                      />
                    </td>
                    {formState.paymentMode === "Bank" && (
                      <>
                        <td>
                          <input
                            className="VE-voucher-type-input"
                            type="number"
                            name="chequeNumber"
                            value={
                              formState.bankDetails[index]?.chequeNumber || ""
                            }
                            onChange={(e) => handleBankDetailChange(index, e)}
                          />
                        </td>
                        <td>
                          <input
                            className="VE-voucher-type-input"
                            type="date"
                            name="chequeDate"
                            value={
                              formState.bankDetails[index]?.chequeDate || ""
                            }
                            onChange={(e) => handleBankDetailChange(index, e)}
                          />
                        </td>
                      </>
                    )}
                    <td>
                      <textarea
                        className="VE-textareas"
                        name="description"
                        rows={3}
                        value={entry.description}
                        onChange={(e) => handleEntryChange(index, e)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <table className="voucher-entry-table">
          <thead className="voucher-entry-tablehead">
            <tr>
              <th>Dr/Cr</th>
              <th>Code</th>
              <th>Ledger (Main)</th>
              <th>Dr Amount</th>
              <th>Cr Amount</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="voucher-entry-tablebody">
            {formState.entries.map((entry, index) => (
              <tr key={index} className="voucher-entry-row">
                <td>
                  <select
                    className="voucher-entry-table-select"
                    value={entry.drCr}
                    onChange={(e) => {
                      const updatedEntries = [...formState.entries];
                      updatedEntries[index].drCr = e.target.value;
                      setFormState((prevState) => ({
                        ...prevState,
                        entries: updatedEntries,
                      }));
                    }}
                  >
                    {formState.voucherType != "Receipt Voucher" && (
                      <option>Dr</option>
                    )}
                    {formState.voucherType === "Receipt Voucher" && (
                      <option>Cr</option>
                    )}
                  </select>
                </td>
                <td>
                  <input
                    className="voucher-entry-table-input"
                    type="text"
                    placeholder="code"
                    value={entry.code}
                    onChange={(e) => {
                      const updatedEntries = [...formState.entries];
                      updatedEntries[index].code = e.target.value;
                      setFormState((prevState) => ({
                        ...prevState,
                        entries: updatedEntries,
                      }));
                    }}
                  />
                </td>
                <td>
                  <input
                    className="voucher-entry-table-input"
                    type="text"
                    placeholder="select ledger"
                    value={entry.ledger}
                    onChange={(e) => {
                      const updatedEntries = [...formState.entries];
                      updatedEntries[index].ledger = e.target.value;
                      setFormState((prevState) => ({
                        ...prevState,
                        entries: updatedEntries,
                      }));
                    }}
                  />
                </td>
                {formState.voucherType != "Receipt Voucher" ? (
                  <td>
                    <input
                      className="voucher-entry-table-input"
                      type="number"
                      value={entry.drAmount}
                      onChange={(e) => {
                        const updatedEntries = [...formState.entries];
                        updatedEntries[index].drAmount = e.target.value;
                        setFormState((prevState) => ({
                          ...prevState,
                          entries: updatedEntries,
                        }));
                      }}
                    />
                  </td>
                ) : (
                  <td></td>
                )}

                {formState.voucherType === "Receipt Voucher" ? (
                  <td>
                    <input
                      className="voucher-entry-table-input"
                      type="number"
                      value={entry.crAmount}
                      onChange={(e) => {
                        const updatedEntries = [...formState.entries];
                        updatedEntries[index].crAmount = e.target.value;
                        setFormState((prevState) => ({
                          ...prevState,
                          entries: updatedEntries,
                        }));
                      }}
                    />
                  </td>
                ) : (
                  <td></td>
                )}

                <td>
                  <textarea
                    className="VE-textareas"
                    value={entry.description}
                    onChange={(e) => {
                      const updatedEntries = [...formState.entries];
                      updatedEntries[index].description = e.target.value;
                      setFormState((prevState) => ({
                        ...prevState,
                        entries: updatedEntries,
                      }));
                    }}
                  />
                </td>
                <td>
                  <button
                    className="remove-entry-btn"
                    type="button"
                    onClick={() => handleRemoveEntry(index)}
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="add-entry-btn"
                    onClick={handleAddEntry}
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="VE-narration-container">
          <div className="VE-narration">
            <label className="VE-narration-label">Narration:</label>
            <textarea value={formState?.paymentGivenTo} rows="4" />
          </div>
          <div className="VE-amt">
            <p>Total Amount : 0</p>
            <p>In Words : Only</p>
          </div>
        </div>

        <div className="voucher-entry-form-actions">
          <button type="submit">Save</button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </>
  );
};

export default VoucherEntry;
