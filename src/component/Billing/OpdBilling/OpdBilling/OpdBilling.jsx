import React, { useState,useRef} from 'react';
import './OpdBilling.css'
import { startResizing } from '../TableHeadingResizing/resizableColumns';

const OpdBilling = () => {
  const [selectedTab, setSelectedTab] = useState('services');
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null); 
  const [advancesTableRows, setAdvancesTableRows] = useState([]);
  const [fileName, setFileName] = useState("No file chosen");
  const identification = "someValue"; // Ensure this is declared

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file ? file.name : "No file chosen");
  };
  // State to manage table rows
 

     
  const [testGridTableRowsableRows, settestGridTableRowsableRows] = useState([
    {

        sn: 1,
        serviceType: "Type A",
        code: "123",
        serviceName: "Service X",
        doctorName: "Dr. John",
        rate: 500,
        qty: 2,
        totalAmt: 1000,
        lessDisc: 10,
        discAmt: 100,
        netAmt: 900,
        emerg: true,
        emergAmt: 50,
        doctorPercent: 20,
        docShareAmt: 180,
        toHospital1: 720,
        toHospital2: 720,
        tokenNo: "T001",
        orderBillId: "ORD001",
    }

  ]);

  

  const [identificationTableRows, setidentificationTableRows] = useState([
    {

        sn: 1,
       idNo:"",
       idName:""


    }

  ]);


  const [paymentDetailsTableRows, setpaymentDetailsTableRows] = useState([
    {

        sn: 1,
       head:"",
       amount:""
    }

  ]);
  
 
  // Function to delete a row from the appropriate table
  const handleDeleteRow = (tableType, indexToRemove) => {
    if (tableType === 'testGrid') {
      const updatedRows = packageTableRows.filter((_, index) => index !== indexToRemove);
      // Renumber the rows
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1
      }));
      settestGridTableRowsableRows(renumberedRows);
    } else if (tableType === 'paymentDetails') {
      const updatedRows = paymentDetailsTableRows.filter((_, index) => index !== indexToRemove);
      // Renumber the rows
      const renumberedRows = updatedRows.map((row, index) => ({
        ...row,
        sn: index + 1
      }));
      paymentDetailsTableRows(renumberedRows);
    }
  };
  
  

  const renderTable = () => {
    switch(selectedTab) {
      case 'testGrid':
        return (
          <div className="services-table">
            <table  ref={tableRef}>
              <thead>
                <tr >
                    {[
                         "Actions",
                         "SN",
                 "Service Type",
                 "Code",
                 "Service Name",
                 "Doctor Name ",
                 "Rate",
                 "Qty",
                 "Total Amt",
                 "Less Disc(%)",
                 "Disc Amt",
                 "Net Amt",
                 "Emerg",
                 "Emerg Amt",
                 "Doctor %",
                 "Doc Share Amt",
                 "To Hospital",
                 "To Hospital",
                 "Token No",
                 "orderbillid"
 
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
                {testGridTableRowsableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="table-actions">
                        <button 
                          className="billing-opd-com-add-btn"
                          onClick={() => handleAddRow('package')}
                        >
                          Add
                        </button>
                        <button 
                          className="billing-opd-com-del-btn"
                          onClick={() => handleDeleteRow('package', index)}
                          disabled={testGridTableRowsableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>{row.serviceType}</td>
        <td>{row.code}</td>
        <td>{row.serviceName}</td>
        <td>{row.doctorName}</td>
        <td>{row.rate}</td>
        <td>{row.qty}</td>
        <td>{row.totalAmt}</td>
        <td>{row.lessDisc}</td>
        <td>{row.discAmt}</td>
        <td>{row.netAmt}</td>
        <td>{row.emerg}</td>
        <td>{row.emergAmt}</td>
        <td>{row.doctorPercent}</td>
        <td>{row.docShareAmt}</td>
        <td>{row.toHospital1}</td>
        <td>{row.toHospital2}</td>
        <td>{row.tokenNo}</td>
        <td>{row.orderBillId}</td>


                  </tr>
                ))}
              </tbody>
           
            </table>
            <div className="billing-opd-com-summary-section">
  <div className="billing-opd-com-summary-row">
    <div className="billing-opd-com-summary-field">
      <label>Less Disc% On All Services:</label>
      <input type="text" value="" />
    </div>
    <div className="billing-opd-com-summary-field">
      <label> Less Disc Amt on All Services :</label>
      <input type="text" value="" />
    </div>
  </div>
</div>

</div>
        );
      
            case 'paymentDetails':
              return (
                <div className="services-table">
                  <table ref={tableRef}>
                    <thead>
                      <tr>{[
                       
                        "SN",
                          "Head",
                          "Amount"
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
                      {paymentDetailsTableRows.map((row, index) => (
                        <tr key={index}>
                         
                          <td>{row.sn}</td>
                          <td>{row.head}</td>
                          <td>{row.amount}</td>
                        
                       
      
                        </tr>
                     
                      ))}
                    </tbody>
                  </table>
                

                </div>
              );
           
  
            

              case 'identification':
                return (
                  <div className="services-table">
                    <table ref={tableRef}>
                      <thead>
                        <tr>{[
                          "Actions",
                          "SN",
                          "Id No",
                          "Id Name"
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
                        {identificationTableRows.map((row, index) => (
                          <tr key={index}>
                            <td>
                              <div className="table-actions">
                                <button 
                                  className="billing-opd-com-add-btn"
                                  onClick={() => handleAddRow('identification')}
                                >
                                  Add
                                </button>
                                <button 
                                  className="billing-opd-com-del-btn"
                                  onClick={() => handleDeleteRow('identification', index)}
                                  disabled={identificationTableRows.length <= 1}
                                >
                                  Del
                                </button>
                              </div>
                            </td>
                            <td>{row.sn}</td>
                            <td>{row.Date}</td>
                            <td>{row.dCode}</td>
                           
        
                          </tr>
                         
                        ))}
                      </tbody>
                    </table>
                   
        
                  </div>
                );
             

    
      default:
        return null;
    }
  };

  return (
    <div className="billing-opd-com-Events">
      <div className="billing-opd-com-title-bar">
        
        <div className="billing-opd-com-header">
          <span>OPD Billing </span>
          </div>
      </div>
      <div className="billing-opd-com-content-wrapper">
        <div className="billing-opd-com-main-section">
        <div className="billing-opd-com-panel dis-templates">
          
        <div className="billing-opd-com-panel-content">
       <div className="billing-opd-com-form-row">
              <label>Mobile No:</label>
  <div className="billing-opd-com-input-with-search">
  <input type="text" value="" />
                  <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>   
                </div>
       </div>
        <div className="billing-opd-com-panel-header">Patient Details</div>
        <div className="billing-opd-com-panel-content">
        <div className="billing-opd-com-form-row">
  <label htmlFor="patientCategory">Patient Category: </label>
  <select id="patientCategory" className="billing-opd-com-patient-category">
    <option value="general">IPD</option>
    <option value="private">OPD</option>
   
  </select>
</div>

<div className="billing-opd-com-form-row">
  <label htmlFor="patientCategory">Category Counter: </label>
  <select id="patientCategory" className="billing-opd-com-patient-category">
    <option value="general">Private OPD</option>
    <option value="private">General OPD</option>
   
  </select>
</div>


              <div className="billing-opd-com-form-row">
                <label>Patient Type: </label>
             
                <select id="patientType" className="billing-opd-com-patient-category">
    <option value="general">Old Patient</option>
    <option value="private">New Patient</option>
   
  </select>
              </div>

              <div className="billing-opd-com-form-row">
                <label>Employee:</label>
                <input type="checkbox" value="" />
              </div>
              {/* <div className="billing-opd-com-form-row">
                <label>Name Initial: </label>
              
                <input type="text" value="DEL" />
                
              </div> */}
              <div className="billing-opd-com-form-row">
                <label>MR No:<span className="billing-opd-required">*</span>
                </label>
                <div className="billing-opd-com-input-with-search">
                <input type="text" />
                  <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
              </div>

              <div className="billing-opd-com-form-row">
  <label>Name Initial:<span className="billing-opd-required">*</span>
  </label>
  <select value="" className="name-initial-select">
    <option value="" disabled>Select</option>
    <option value="Mr.">Mr.</option>
    <option value="Mrs.">Mrs.</option>
    <option value="Ms.">Ms.</option>
    <option value="Dr.">Dr.</option>
    <option value="Prof.">Prof.</option>
  </select>
</div>


              <div className="billing-opd-com-form-row">
              <label>F Name:<span className="billing-opd-required">*</span>
              </label>
              <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
              <label>M Name:</label>
              <input type="text" value="" />
              
              </div>
              <div className="billing-opd-com-form-row">
              <label>L Name:</label>
              <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
  <label>Gender:<span className="billing-opd-required">*</span>
  </label>
  <select value="" className="name-initial-select">
    <option value="" disabled>Select</option>
    <option value="Mr.">Male</option>
    <option value="Mrs.">Femal.</option>
    <option value="Ms.">Other</option>
  
  </select>
</div>


<div className="billing-opd-com-form-row">
  <label>Material Status:<span className="billing-opd-required">*</span>
  </label>
  <select value="Male" className="material-status-select">
    <option value="Single">Single</option>
    <option value="Married">Married</option>
    <option value="Divorced">Divorced</option>
    <option value="Widowed">Widowed</option>
  </select>
</div>

<div className="billing-opd-com-form-row">
  <label>Relation:<span className="billing-opd-required">*</span>
  </label>
  <select value="Male" className="relation-select">
    <option value="Father">Father</option>
    <option value="Mother">Mother</option>
    <option value="Brother">Brother</option>
    <option value="Sister">Sister</option>
    <option value="Son">Son</option>
    <option value="Daughter">Daughter</option>
    <option value="Spouse">Spouse</option>
    <option value="Other">Other</option>
  </select>
</div>

              <div className="billing-opd-com-form-row">
              <label>RelativeName:<span className="billing-opd-required">*</span>
              </label>
              <input type="text" value="Male" />
              </div>
              <div className="billing-opd-com-form-row">
              <label>Age:</label>
              <input type="text" value="" />

</div>
<div className="billing-opd-com-form-row">
  <label>Address:<span className="billing-opd-required">*</span>
  </label>
  <input type="text" value="" />

</div>

            
          </div>
         
            




          </div>

          
          <div className="billing-opd-com-panel operation-details">
            <div className="billing-opd-com-panel-content">

            <div className="billing-opd-com-form-row">
                <label>City/Village: </label>
                <div className="billing-opd-com-input-with-search">

                <input type="text" value="" />
              
                               <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>District: </label>
                <div className="billing-opd-com-input-with-search">
             
   
                <input type="text" value="" />
            
                  <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>State: </label>
                <div className="billing-opd-com-input-with-search">
              
   
                <input type="text" value="" />
                {/* </select>                  <button className="billing-opd-com-magnifier-btn">🔍</button> */}
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>PinCode:<span className="billing-opd-required">*</span>
                </label>
                <div className="billing-opd-com-input-with-search">
   
                <input type="text" value="" />
                               <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>Country: </label>
                <div className="billing-opd-com-input-with-search">
                
   
                <input type="text" value="" />
                            
                 <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
              </div>
              <div className="billing-opd-com-form-row">
                <label>Nationality: </label>
                <div className="billing-opd-com-input-with-search">
                
   
                <input type="text" value="" />
                <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
              </div>
              <div className="billing-opd-com-form-row">
              <label>Religion:</label>
              <input type="number" value="" />
              </div>
              <div className="billing-opd-com-form-row">
              <label>Caste:</label>
            
   
              <div className="billing-opd-com-input-with-search">
                
   
                <input type="text" value="" />
                <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
              </div>
              <div className="billing-opd-com-form-row">
              <label>Source Of Registration:</label>
              <input type="text" value="" />
              </div>
            
              <div className="billing-opd-com-form-row">
              <label>Mobile No:<span className="billing-opd-required">*</span>
              </label>
              <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
              <label>Phone:</label>
              <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Email Id:<span className="billing-opd-required">*</span>
                </label>
                <input type="text" value="" />
                </div>
              <div className="billing-opd-com-form-row">
                <label>Type:<span className="billing-opd-required">*</span>
                </label>
                <input type="text" value="" />
                </div>

              <div className="billing-opd-com-form-row">
                <label>Doctor Name:<span className="billing-opd-required">*</span>
                </label>
                <div className="billing-opd-com-input-with-search">
                
   
                <input type="text" value="" />
                <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
 </div>
              <div className="billing-opd-com-form-row">
                <label>Referral Type:</label>
                <select>
   
   <option value="Other">Other</option>
 </select>              </div>

            </div>
          </div>




          <div className="billing-opd-com-panel operation-details">
              {/* <div className="billing-opd-com-panel-header">Surgery Details</div>  */}
            <div className="billing-opd-com-panel-content">
            <div className="billing-opd-com-form-row">
                <label>Referred Dr:<span className="billing-opd-required">*</span>
                </label>
                <div className="billing-opd-com-input-with-search">
                
   
                <input type="text" value="" />
                <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
  </div>
              <div className="billing-opd-com-form-row">
                <label>Bill No:</label>
                <input type="text" value="" />
              </div>
             
              
              <div className="billing-opd-com-form-row">
                <label>NonRegular DoctorNM:</label>
                <input type="text" value="" />
              </div>
             

              <div className="billing-opd-com-form-row">
                <label>Package:</label>
                <input type="checkbox" value="" />
              </div>

              <div className="billing-opd-com-form-row">
                <label>Pkg Type:</label>
                <select id="patientCategory" className="billing-opd-com-patient-category">
    <option value="general"> OPD Package</option>
    <select id="patientCategory" className="billing-opd-com-patient-category">
    <option value="general">Private OPD</option>
    <option value="private">Other</option>
   
  </select>   
  </select>              </div>
              <div className="billing-opd-com-form-row">
                <label>Sumamt:</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>ERNO:</label>
                <div className="billing-opd-com-input-with-search">
                
   
                <input type="text" value="" />
                <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
  </div>
              <div className="billing-opd-com-form-row">
                <label>Trustede Name:</label>
                <div className="billing-opd-com-input-with-search">
                
   
                <input type="text" value="" />
                <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
  </div>
              <div className="billing-opd-com-form-row">
                <label>Old Mrno:</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Empdiscountpolicy:</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Emp Credit Limit:</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Emp Credit Availed:</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Diagnosis:</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Last Consulta:</label>
                <input type="text" value="" />
              </div>

          
        
           
           
          
          
          
         
          </div>
            </div>
       </div>
        <div className="billing-opd-com-services-section">
          <div className="billing-opd-com-tab-bar">
          
          <button 
              className={`billing-opd-com-tab ${selectedTab === 'testGrid' ? 'active' : ''}`}
              onClick={() => setSelectedTab('testGrid')}>
              TestGrid
            </button>
            <button 
              className={`billing-opd-com-tab ${selectedTab === 'identification' ? 'active' : ''}`}
              onClick={() => setSelectedTab('identification')}>
             Identification
            </button>
            <button 
              className={`billing-opd-com-tab ${selectedTab === 'paymentDetails' ? 'active' : ''}`}
              onClick={() => setSelectedTab('paymentDetails')}>
             PaymentDetail
            </button>

               </div>
          {renderTable()}
        </div>
        <div className="billing-opd-com-main-section">
        <div className="billing-opd-com-panel dis-templates">
       
            <div className="billing-opd-com-panel-header">Financial Details</div>
        <div className="billing-opd-com-panel-content">
              <div className="billing-opd-com-form-row">
                <label>Total Amt:<span className="billing-opd-required">*</span>
                </label>
                  <input type="text" value="0" />
               
              </div>
              <div className="billing-opd-com-form-row">
                <label> Final Disc Amt: </label>
              
                  <input type="text" value="0" />
                
              </div>
             
              <div className="billing-opd-com-form-row">
                <label>Net Amt:</label>
                <input type="text" value="0" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Paid Amt:</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Credit Amt:</label>
                <input type="text" value="0" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Curr Balance :</label>
                <input type="text" value="0.00" />
              </div>
              <div className="billing-opd-com-form-row">
              <label>Disc Reason:<span className="billing-opd-required">*</span>
              </label>
              <div className="billing-opd-com-input-with-search">
                
   
                <input type="text" value="" />
                <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>        
   </div>
              <div className="billing-opd-com-form-row">
              <label>Disc Authorization:<span className="billing-opd-required">*</span>
              </label>
              <div className="billing-opd-com-input-with-search">
                
   
                <input type="text" value="" />
                <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>    
  </div>
             
            </div>
          </div>
          <div className="billing-opd-com-panel operation-details">  
            {/* <div className="billing-opd-com-panel-header">Package Details</div> */}
            <div className="billing-opd-com-panel-content">
          
              <div className="billing-opd-com-form-row">
                <label>Remarks:<span className="billing-opd-required">*</span>
                </label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Last Consult Doctor :</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Last Consult Date:</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>Last Consult Fee :</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-form-row">
                <label>OP Bal Amt :</label>
                <input type="text" value="" />
              </div>
              <div className="billing-opd-com-panel-header">Attach Files</div>
           <div className="billing-opd-com-sh-section">
            <label>File Name</label>          <input className="final-attach" type="text" />
            
          <input   type="file" />
          <button className="billing-opd-com-sh-save-btn">Upload</button>

        </div>
        <div className="billing-opd-com-form-row">
                <label>Appt No :</label>
                <div className="billing-opd-com-input-with-search">
                
   
                <input type="text" value="" />
                <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
              </div>
              
             
             
              
              
            </div>
          </div>
          <div className="billing-opd-com-panel operation-details">
              <div className="billing-opd-com-panel-header"></div> 
            <div className="billing-opd-com-panel-content">
            
            <div className="billing-opd-com-form-row">
            <label>Appt Date:</label>
            <select>
   
   <option value="Other">Other</option>
 </select>                      </div>
            <div className="billing-opd-com-form-row">
            <label>Employee Credit:</label>
              <input type="text" value="" />
            </div>
            <div className="billing-opd-com-form-row">
            <label>Employee Outstanding:</label>
              <input type="text" value="" />
            </div>
            <div className="billing-opd-com-form-row">
            <label>Current Discount Policy:</label>
            <div className="billing-opd-com-input-with-search">
                
   
                <input type="text" value="" />
                <button className="billing-opd-com-magnifier-btn">🔍</button>
                </div>
  </div>
            <div className="billing-opd-com-form-row">
            <label>Total Doctor share Amount:</label>
              <input type="text" value="0.00" />
            </div>
            <div className="billing-opd-com-form-row">
            <label>Total To Hospital:</label>
              <input type="text" value="0.00" />
            </div>
            
           <div className="billing-opd-com-panel-header">Attach Mode</div>
           <div className="billing-opd-com-sh-section">
           <table ref={tableRef}>
        <thead>
          <tr>
            {["SN", "Payment", "Amount", "Card Number", "ChqDt"].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="resizable-th"
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
          {advancesTableRows.map((row, index) => (
            <tr key={index}>
              <td>{row.sn}</td>
              <td>{row.payment}</td>
              <td>{row.amount}</td>
              <td>{row.cardNumber}</td>
              <td>{row.chqdt}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>

          </div>
            </div>
          
        </div>
        <div className="billing-opd-com-action-buttons">
          <button className="btn-blue">Save</button>
          <button className="btn-red">Delete</button>
          <button className="btn-orange">Clear</button>
          <button className="btn-gray">Close</button>
          <button className="btn-blue">Search</button>
          <button className="btn-gray">Tracking</button>
          <button className="btn-green">Print</button>
          <button className="btn-blue">Export</button>
          <button className="btn-gray">Import</button>
          <button className="btn-green">Health</button>
          <button className="btn-gray">Version Comparison</button>
          <button className="btn-gray">SDC</button>
          <button className="btn-gray">Testing</button>
          <button className="btn-blue">Info</button>
        </div>
      </div>
    </div>
  );
};
export default OpdBilling;
