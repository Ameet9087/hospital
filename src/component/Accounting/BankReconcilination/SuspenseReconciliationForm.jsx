import React, { useState } from "react";

const SuspenseReconciliationForm = () => {
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
    if (formState.entries.length > 1) {
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

  return (
    <form className="bank-reconciliation__form">
      <div className="bank-reconciliation__row">
        <label className="bank-suspensereconciliation__field">
          Select Bank:
          <select>
            <option>Select bank</option>
          </select>
        </label>

        <label className="bank-suspensereconciliation__field">
          Reference Voucher Number:
          <select>
            <option></option>
          </select>
        </label>

        <label className="bank-suspensereconciliation__field">
          Voucher Type:
          <select
            name="voucherType"
            value={formState.voucherType}
            onChange={handleChange}
          >
            {voucherTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="bank-suspensereconciliation__field">
          Voucher Number:
          <input
            type="text"
            name="voucherNumber"
            value={formState.voucherNumber}
            readOnly
          />
        </label>

        <label className="bank-suspensereconciliation__field">
          Voucher Date:
          <input
            type="text"
            name="voucherDate"
            value={formState.voucherDate}
            readOnly
          />
        </label>
      </div>

      <table className="bank-reconciliation__table">
        <thead>
          <tr>
            <th>Dr/Cr</th>
            <th>Code</th>
            <th>Ledger (Main)</th>
            <th>Dr Amount</th>
            <th>Cr Amount</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {formState.entries.map((entry, index) => (
            <tr key={index}>
              <td>
                <select
                  className="bank-reconciliation-table-select"
                  name="drCr"
                  value={entry.drCr}
                  onChange={(e) => handleEntryChange(index, e)}
                >
                  {formState.voucherType !== "Receipt Voucher" && (
                    <option>Dr</option>
                  )}
                  {formState.voucherType === "Receipt Voucher" && (
                    <option>Cr</option>
                  )}
                </select>
              </td>
              <td>
                <input
                  className="bank-reconciliation-table-input"
                  type="text"
                  name="code"
                  placeholder="code"
                  value={entry.code}
                  onChange={(e) => handleEntryChange(index, e)}
                />
              </td>
              <td>
                <input
                  className="bank-reconciliation-table-input"
                  type="text"
                  name="ledger"
                  placeholder="select ledger"
                  value={entry.ledger}
                  onChange={(e) => handleEntryChange(index, e)}
                />
              </td>
              {formState.voucherType !== "Receipt Voucher" ? (
                <td>
                  <input
                    className="bank-reconciliation-table-input"
                    type="number"
                    name="drAmount"
                    value={entry.drAmount}
                    onChange={(e) => handleEntryChange(index, e)}
                  />
                </td>
              ) : (
                <td></td>
              )}
              {formState.voucherType === "Receipt Voucher" ? (
                <td>
                  <input
                    className="bank-reconciliation-table-input"
                    type="number"
                    name="crAmount"
                    value={entry.crAmount}
                    onChange={(e) => handleEntryChange(index, e)}
                  />
                </td>
              ) : (
                <td></td>
              )}
              <td>
                <textarea
                  className="VE-textareas"
                  name="description"
                  value={entry.description}
                  onChange={(e) => handleEntryChange(index, e)}
                />
              </td>
              <td>
                <button
                  type="button"
                  className="bank-reconciliation__add-btn"
                  onClick={handleAddEntry}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bank-reconciliation__row">
        <label className="bank-reconciliation__field bank-reconciliation__narration">
          Narration:
          <textarea rows={6} name="narration" value={formState.narration} />
        </label>
        <div className="bank-reconciliation__totals">
          <p>
            Total Debit:{" "}
            {formState.entries.reduce(
              (sum, entry) => sum + parseFloat(entry.drAmount || 0),
              0
            )}
          </p>
          <p>
            Total Credit:{" "}
            {formState.entries.reduce(
              (sum, entry) => sum + parseFloat(entry.crAmount || 0),
              0
            )}
          </p>
          <p>In Words: Only</p>
        </div>
      </div>

      <div className="bank-reconciliation__actions">
        <button className="bank-reconciliation__reconcile-btn">
          Reconcile
        </button>
        <button className="bank-reconciliation__cancel-btn">Cancel</button>
      </div>
    </form>
  );
};

export default SuspenseReconciliationForm;
