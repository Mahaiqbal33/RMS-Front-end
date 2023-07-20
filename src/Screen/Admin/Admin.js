import React from 'react';
import { observer } from 'mobx-react';
import AdminPopup from '../../Component/AdminComponent/AdminPopup';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { adminStore } from '../../Store/AdminStore/AdminStore';
import '../Style/ScreenStyle.css'; // Import the CSS file for styling
import '../Style/TableStyle.css'

const Admin = observer(() => {
  const { isPopupOpen, setPopupOpen, fetchAdmins, getAdmin, deleteAdmin } = adminStore;

  const handleAddAdmin = () => {
    setPopupOpen(true);
  };

  const handleFormSubmit = () => {
    setPopupOpen(false);
  };

  React.useEffect(() => {
    // Fetch admin data when the component mounts
    fetchAdmins();
  }, [fetchAdmins]);

  const handleDelete = (adminId) => {
    deleteAdmin(adminId);
  };
 const handleEdit=(adminId)=>{

 }
  return (
    <div className="new-container">
      <div className="new-content-section">
        <div className="left-section">
          <h2 className="new-title">Admins</h2>
        </div>
        <div className="right-section">
          <button className="add-button" onClick={handleAddAdmin}>
            Add Admin
          </button>
        </div>
      </div>
      {getAdmin.length > 0 ? (
        <table className="content-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Class</th>
              <th>Username</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getAdmin.map((admin, index) => (
              <tr key={index} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
                <td>
                  <div className="table-info">
                    {admin.name}
                  </div>
                </td>
                <td>{admin.subject}</td>
                <td>{admin.class_name}</td>
                <td>{admin.user_name}</td>
                <td>{admin.gender}</td>
                <td>
                  <div className="action-buttons">
                    <button className="edit-button" onClick={() => handleEdit(admin.id)}>
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(admin.id)} className="delete-button">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-admin-message">No admins available.</div>
      )}
      {isPopupOpen && <AdminPopup onSubmit={handleFormSubmit} />}
    </div>
  );
});

export default Admin;
