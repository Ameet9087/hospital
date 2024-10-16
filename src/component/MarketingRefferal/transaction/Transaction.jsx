/* neha-mktreffaral-transaction-19/09/24 */
import React, { useState, useEffect ,useRef} from 'react';
import { FaSearch } from 'react-icons/fa';
import './transaction.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../../api/api';

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);

  // Fetch data from API
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/transactions/fetch-all-transaction`);
        const data = await response.json();
        console.log(data);
        
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  // Function to open the modal
  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className='mkrt_transaction_main_container'>
      <div className="mkrt_transaction-header">
        <div className="mkrt_transaction-date-picker">
          <div className='date_transaction'>
            <label>From: <input type="date" /></label>
            <label>To: <input type="date" /></label>
            <button>OK</button>
          </div>
        </div>
      </div>
      <div className='mkrt_transaction-search_main'>
        <div className="mkrt_transaction-search">
          <input type="text" placeholder="Search" />
          {/* <button className="mkrt_transaction-search-button">
            <FaSearch />
          </button> */}
          {/* <label htmlFor=""> showing {transactions.length}/{transactions.length} result</label> */}
        </div>
      </div>
      <div className="table-container">
        <table className="mkrt_transaction-table" ref={tableRef}>
          <thead>
            <tr>
            {[
  "Invoice Date",
  "Invoice No",
  "Hospital No",
  "Patient Name",
  "Age/Sex",
  "Invoice Amount",
  "Return Amount",
  "Net Amount",
  "Entered?"
].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="rd-resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
            <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.transactionId}>
                <td>{transaction.invoiceDate}</td>
                <td>{transaction.invoiceNumber}</td>
                <td>{transaction.hospitalNumber}</td>
                <td>{transaction.patientName}</td>
                <td>{transaction.age}/{transaction.gender}</td>
                <td>{transaction.invoiceAmount}</td>
                <td>{transaction.returnAmount}</td>
                <td>{transaction.netAmount}</td>
                <td><button className="nobtn" onClick={() => openModal(transaction)}>No(0)</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="mkrt_transaction-pagination">
          <button>First</button>
          <button>Previous</button>
          <span>Page 1 of 1</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      </div>

      {/* Modal section */}
      {isModalOpen && selectedTransaction && (
        <div className="transaction_modal">
          <div className="transaction_modal-content">
            <span className="transaction_modal-close-button" onClick={closeModal}>&times;</span>
            <header className="transaction_modal-header">
              <div><strong>Patient Name:</strong> {selectedTransaction.patientName} ({selectedTransaction.age}/{selectedTransaction.gender})</div>
              <div><strong>Hospital No:</strong> {selectedTransaction.hospitalNumber}</div>
              <div><strong>Invoice No:</strong> {selectedTransaction.invoiceNumber}</div>
              <div><strong>Invoice Date:</strong> {selectedTransaction.invoiceDate}</div>
              <div><strong>Net Amount:</strong> {selectedTransaction.netAmount}</div>
            </header>
            
            <div className='toto' style={{display:"flex"}}>
              <div className="transaction_modal-bill-details">
                <h3>Bill Details:</h3>
                <table>
                  <thead>
                    <tr>
                      <th>S.N.</th>
                      <th>Item Name</th>
                      <th>Net. Qty</th>
                      <th>Net Amt.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Replace with actual bill details */}
                    <tr>
                      <td>1.</td>
                      <td>MP SMEAR</td>
                      <td>1</td>
                      <td>2,000.00</td>
                    </tr>
                    <tr>
                      <td>2.</td>
                      <td>CREATININE</td>
                      <td>1</td>
                      <td>1,200.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='tototo' style={{display:"flex", flexDirection:"column", marginLeft:"20px", border:"1px solid black" , padding:"5px"}}>
                <div className="transaction_modal-referral-entry">
                  <h3>Referral Entry</h3>
                  <form>
                    <div className="transaction_modal-form-group">
                      <label>Ref. Scheme*</label>
                      <select><option value="">Select Scheme</option></select>
                    </div>
                    <div className="transaction_modal-form-group">
                      <label>Referring Party*</label>
                      <input type="text" placeholder="Enter Name, Vehicle No, etc (min 3 characters)" />
                    </div>
                    <div className="transaction_modal-form-group">
                      <label>Remarks</label>
                      <input type="text" />
                    </div>
                    <div className="transaction_modal-form-group">
                      <label>Group:</label>
                      <input type="text" />
                    </div>
                    <div className="transaction_modal-form-group">
                      <label>Organization:</label>
                      <input type="text" />
                    </div>
                    <div className="transaction_modal-form-group">
                      <label>Vehicle No:</label>
                      <input type="text" />
                    </div>
                    <div className="transaction_modal-form-group">
                      <label>Area:</label>
                      <input type="text" />
                    </div>
                    <div className="transaction_modal-form-group">
                      <label>Ref. %:</label>
                      <input type="text" />
                    </div>
                    <div className="transaction_modal-form-group">
                      <label>Amount:</label>
                      <input type="text" />
                    </div>
                    <div className="transaction_modal-buttons">
                      <button type="submit" className="transaction_modal-save-button">Save</button>
                      <button type="reset" className="transaction_modal-clear-button">Clear</button>
                    </div>
                  </form>
                </div>
                
                <div className="transaction_modal-already-entered">
                  <h3>Already Entered:</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Scheme</th>
                        <th>Referring Party</th>
                        <th>Org. / Area Code</th>
                        <th>Vehicle No</th>
                        <th>Ref %</th>
                        <th>Amount</th>
                        <th>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Table rows for already entered referrals can go here */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transaction;
