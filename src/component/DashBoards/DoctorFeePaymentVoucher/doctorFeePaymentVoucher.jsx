import { useState } from 'react'
import './doctorFeePaymentVoucher.css'

const DoctorFeePaymentVoucher = () => {
  return (
    <div className="doctorFeePaymentVoucher-container">
      <div className="doctorFeePaymentVoucher-header-form">
        <div className="doctorFeePaymentVoucher-form-row">
          <div className="doctorFeePaymentVoucher-form-group">
            <label>Voucher Type<span className="doctorFeePaymentVoucher-required">*</span> :</label>
            <div className="doctorFeePaymentVoucher-search-field">
              <input type="text" />
              <button className="doctorFeePaymentVoucher-search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </div>
          <div className="doctorFeePaymentVoucher-form-group">
            <label>Voucher No :</label>
            <input type="text" />
          </div>
          <div className="doctorFeePaymentVoucher-form-group">
            <label>Select Month<span className="doctorFeePaymentVoucher-required">*</span> :</label>
            <select>
              <option value="">select</option>
            </select>
          </div>
          <div className="doctorFeePaymentVoucher-form-group">
            <label>Select Unit Dr<span className="doctorFeePaymentVoucher-required">*</span> :</label>
            <div className="doctorFeePaymentVoucher-search-field">
              <input type="text" />
              <button className="doctorFeePaymentVoucher-search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </div>
          <a href="#" className="doctorFeePaymentVoucher-collect-data-link">Collect Data</a>
        </div>
        
        <div className="doctorFeePaymentVoucher-form-row">
          <div className="doctorFeePaymentVoucher-form-group">
            <label>Voucher Date<span className="doctorFeePaymentVoucher-required">*</span> :</label>
            <input type="date" defaultValue="2024-02-11" />
          </div>
          <div className="doctorFeePaymentVoucher-form-group">
            <label>Select Year<span className="doctorFeePaymentVoucher-required">*</span> :</label>
            <select>
              <option value="">select</option>
            </select>
          </div>
        </div>
      </div>

      <div className="doctorFeePaymentVoucher-payroll-section">
        <div className="doctorFeePaymentVoucher-payroll-header">
          <div className="doctorFeePaymentVoucher-title">Payroll Voucher</div>
          {/* <button className="doctorFeePaymentVoucher-add-row">(Control + Enter For New Row)</button> */}
        </div>

        <div className="doctorFeePaymentVoucher-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>SN</th>
                <th>DrCr</th>
                <th>Subhead</th>
                <th className="doctorFeePaymentVoucher-search-column">Cost Centre</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td></td>
                <td>
                  <div className="doctorFeePaymentVoucher-search-field">
                    <input type="text" />
                    <button className="doctorFeePaymentVoucher-search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                  </div>
                </td>
                <td>
                  <div className="doctorFeePaymentVoucher-search-field">
                    <input type="text" />
                    <button className="doctorFeePaymentVoucher-search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                  </div>
                </td>
                <td></td>
                <td></td>
                <td>
                  <div className="doctorFeePaymentVoucher-action-buttons">
                    <button className="doctorFeePaymentVoucher-add-btn">Add</button>
                    <button className="doctorFeePaymentVoucher-del-btn">Del</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="doctorFeePaymentVoucher-footer-section">
          <div className="doctorFeePaymentVoucher-amount-section">
            <div className="doctorFeePaymentVoucher-amount-row">
              <label>Debit Amount :</label>
              <input type="text" value="0" readOnly />
            </div>
            <div className="doctorFeePaymentVoucher-amount-row">
              <label>Credit Amount :</label>
              <input type="text" value="0" readOnly />
            </div>
          </div>
          <div className="doctorFeePaymentVoucher-narration-section">
            <div className="doctorFeePaymentVoucher-amount-row">
              <label>Amount In Words :</label>
              <input type="text" value="Rupees Zero Only" readOnly />
            </div>
            <div className="doctorFeePaymentVoucher-amount-row">
              <label>Narration<span className="doctorFeePaymentVoucher-required">*</span> :</label>
              <textarea></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorFeePaymentVoucher