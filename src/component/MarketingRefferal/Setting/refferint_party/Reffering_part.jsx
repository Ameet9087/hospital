/* neha-mktreffaral-refering-party-19/09/24 */
import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import { FaPlus, FaSearch } from 'react-icons/fa';
import './reffering.css';

import { startResizing } from '../../../../TableHeadingResizing/resizableColumns';


const ReferringParty = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parties, setParties] = useState([]);
  const [partyName, setPartyName] = useState('');
  const [partyGroupName, setPartyGroupName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [address, setAddress] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [areaCode, setAreaCode] = useState('');
  const [kraPin, setKraPin] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);

  useEffect(() => {
    // Fetch referring parties from API
    axios.get(`${API_BASE_URL}/ReferingParty/fetch-all-ReferingParty`)
      .then(response => {
        setParties(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the referring parties!', error);
      });
  }, []);

  const filteredParties = parties.filter(party =>
    party.partyName && party.partyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDeactivate = (id) => {
    const confirmation = window.confirm("Are you sure you want to deactivate this party?");
    if (confirmation) {
      axios.put(`${API_BASE_URL}/referring-parties/deactivate/${id}`)
        .then(() => {
          setParties(prevParties =>
            prevParties.map(party =>
              party.id === id ? { ...party, isActive: false } : party
            )
          );
        })
        .catch(error => {
          console.error('There was an error updating the party status!', error);
        });
    }
  };

  const handleActivate = (id) => {
    const confirmation = window.confirm("Are you sure you want to activate this party?");
    if (confirmation) {
      axios.put(`${API_BASE_URL}/referring-parties/activate/${id}`)
        .then(() => {
          setParties(prevParties =>
            prevParties.map(party =>
              party.id === id ? { ...party, isActive: true } : party
            )
          );
        })
        .catch(error => {
          console.error('There was an error updating the party status!', error);
        });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!partyName.trim()) newErrors.partyName = 'Party Name is required';
    if (!partyGroupName.trim()) newErrors.partyGroupName = 'Group Name is required';
    if (!organizationName.trim()) newErrors.organizationName = 'Organization Name is required';
    if (!address.trim()) newErrors.address = 'Address is required';
    if (contactNo && isNaN(contactNo)) newErrors.contactNo = 'Contact Number must be a number';
    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newParty = {
      partyId: parties.length + 1, 
      partyName,
      partyGroupName,
      organizationName,
      address,
      vehicleNo,
      contactNo,
      areaCode,
      kraPin,
      isActive: true,
    };

    setIsLoading(true);

    axios.post(`${API_BASE_URL}/ReferingParty/save-referingParty`, newParty)
      .then(() => {
        alert('Referring Party saved successfully!');
        setParties([...parties, newParty]);
        setPartyName('');
        setPartyGroupName('');
        setOrganizationName('');
        setAddress('');
        setVehicleNo('');
        setContactNo('');
        setAreaCode('');
        setKraPin('');
        handleCloseModal();
      })
      .catch(error => {
        console.error('There was an error saving the referring party!', error);
        alert('Failed to save referring party. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="referring_party_main">
      <div className="referring_party_container">
        <div className="referring_party_new_party">
          <button className="referring_party_new_party_button" onClick={handleOpenModal}>
            <FaPlus className="referring_party_button_icon" />
            Add Referring Party
          </button>
        </div>
      </div>

      <div className="referring_party_filter_content">
        <div className="referring_party_search_bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            className="referring_party_input_text"
          />
          {/* <button className="referring_party_filter_button">
            <FaSearch />
          </button> */}
          {/* <div>
            <label>Showing {filteredParties.length} results</label>
          </div> */}
        </div>
      </div>

      <div className='table-container'>
      <table className="referring_party_table" ref={tableRef}>
        <thead>
          <tr>
          {[
  "Party Name",
  "Group Name",
  "Organization Name",
  "Address",
  "Vehicle Number",
  "Contact Number",
  "Area Code",
  "KRA PIN",
  "Is Active",
  "Action"
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
          {filteredParties.map((party) => (
            <tr key={party.id}>
              <td className="referring_party_tabledata">{party.partyName}</td>
              <td className="referring_party_tabledata">{party.partyGroupName}</td>
              <td className="referring_party_tabledata">{party.organizationName}</td>
              <td className="referring_party_tabledata">{party.address}</td>
              <td className="referring_party_tabledata">{party.vehicleNo}</td>
              <td className="referring_party_tabledata">{party.contactNo}</td>
              <td className="referring_party_tabledata">{party.areaCode}</td>
              <td className="referring_party_tabledata">{party.kraPin}</td>
              <td className="referring_party_tabledata">{party.isActive ? 'true' : 'false'}</td>
              <td className="referring_party_tabledata">
                {party.isActive ? (
                  <>
                    <button
                      onClick={() => handleDeactivate(party.id)}
                      className="referring_party_active_button active"
                    >
                      Deactivate
                    </button>
                    <button
                      onClick={() => alert("Edit functionality goes here!")}
                      className="referring_party_edit_button"
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleActivate(party.id)}
                    className="referring_party_active_button inactive"
                  >
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {isModalOpen && (
        <div className="referring_party_modal">
          <div className="referring_party_modal_content">
            <div className="referring_party_modal_header">
              <h2>Add New Referring Party</h2>
              <button className="referring_party_close_button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="referring_party_modal_body">
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                <div className="referring_party_modal_field">
                  <label>Party Name:</label>
                  <input
                    type="text"
                    value={partyName}
                    onChange={(e) => setPartyName(e.target.value)}
                  />
                  {errors.partyName && <p className="error">{errors.partyName}</p>}
                </div>

                <div className="referring_party_modal_field">
                  <label>Group Name:</label>
                  <input
                    type="text"
                    value={partyGroupName}
                    onChange={(e) => setPartyGroupName(e.target.value)}
                  />
                  {errors.partyGroupName && <p className="error">{errors.partyGroupName}</p>}
                </div>

                <div className="referring_party_modal_field">
                  <label>Organization Name:</label>
                  <input
                    type="text"
                    value={organizationName}
                    onChange={(e) => setOrganizationName(e.target.value)}
                  />
                  {errors.organizationName && <p className="error">{errors.organizationName}</p>}
                </div>

                <div className="referring_party_modal_field">
                  <label>Address:</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {errors.address && <p className="error">{errors.address}</p>}
                </div>

                <div className="referring_party_modal_field">
                  <label>Vehicle Number:</label>
                  <input
                    type="text"
                    value={vehicleNo}
                    onChange={(e) => setVehicleNo(e.target.value)}
                  />
                </div>

                <div className="referring_party_modal_field">
                  <label>Contact Number:</label>
                  <input
                    type="text"
                    value={contactNo}
                    onChange={(e) => setContactNo(e.target.value)}
                  />
                  {errors.contactNo && <p className="error">{errors.contactNo}</p>}
                </div>

                <div className="referring_party_modal_field">
                  <label>Area Code:</label>
                  <input
                    type="text"
                    value={areaCode}
                    onChange={(e) => setAreaCode(e.target.value)}
                  />
                </div>

                <div className="referring_party_modal_field">
                  <label>KRA PIN:</label>
                  <input
                    type="text"
                    value={kraPin}
                    onChange={(e) => setKraPin(e.target.value)}
                  />
                </div>

                <div className="referring_party_modal_footer">
                  <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReferringParty;
