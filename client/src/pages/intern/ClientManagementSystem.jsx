import React from 'react';

const ClientManagementSystem = () => {
  const clients = [
    { id: 1, accountId: 'BS241701', accountType: 'Active Account', contactName: 'Ramche, Kirti', companyName: 'Cakex', mobileNumber: '944 8218935', action: 'Edit / Delete' },
    { id: 2, accountId: 'BS241371', accountType: 'Active Account', contactName: 'Bishnu Prasad', companyName: 'Tax consultant', mobileNumber: '944 1200899', action: 'Edit / Delete' },
    { id: 3, accountId: 'BS241576', accountType: 'Contract Lead', contactName: 'Nitya sehara', companyName: 'Word Lynks Pvt Ltd', mobileNumber: '944 1206917', action: 'Edit / Delete' },
    { id: 4, accountId: 'BS242073', accountType: 'Active Account', contactName: 'Surjit Sharma', companyName: 'Win Technology', mobileNumber: '944 8004740', action: 'Edit / Delete' },
  ];

  return (
    <div style={{ display: 'flex', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', backgroundColor: '#1a237e', color: 'white', padding: '20px' }}>
        <h2 style={{ margin: '0 0 20px' }}>CMS</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '10px' }}>Dashboard</li>
          <li style={{ marginBottom: '10px' }}>Services</li>
          <li style={{ marginBottom: '10px' }}>Add Clients</li>
          <li style={{ marginBottom: '10px' }}>Client List</li>
          <li style={{ marginBottom: '10px' }}>Payment</li>
          <li style={{ marginBottom: '10px' }}>Reports</li>
          <li style={{ marginBottom: '10px' }}>Service Invoice</li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ backgroundColor: '#e3f2fd', padding: '10px', marginBottom: '20px' }}>
          <span>Home / Services</span>
        </div>
        <h1 style={{ margin: '0 0 20px' }}>Manage Clients</h1>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#e3f2fd' }}>
              <th style={tableHeaderStyle}>No.</th>
              <th style={tableHeaderStyle}>Account ID</th>
              <th style={tableHeaderStyle}>Account Type</th>
              <th style={tableHeaderStyle}>Contact Name</th>
              <th style={tableHeaderStyle}>Company Name</th>
              <th style={tableHeaderStyle}>Mobile Number</th>
              <th style={tableHeaderStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td style={tableCellStyle}>{client.id}</td>
                <td style={tableCellStyle}>{client.accountId}</td>
                <td style={tableCellStyle}>{client.accountType}</td>
                <td style={tableCellStyle}>{client.contactName}</td>
                <td style={tableCellStyle}>{client.companyName}</td>
                <td style={tableCellStyle}>{client.mobileNumber}</td>
                <td style={tableCellStyle}>{client.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const tableHeaderStyle = {
  padding: '10px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd'
};

const tableCellStyle = {
  padding: '10px',
  borderBottom: '1px solid #ddd'
};

export default ClientManagementSystem;