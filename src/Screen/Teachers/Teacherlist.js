import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { FaTrash, FaEdit,FaSearch } from 'react-icons/fa';
import { teacherStore } from '../../Store/TeacherStore';
import { toJS } from 'mobx';
import './TeacherList.css';
import maleImage from '../../assets/male.png';
import femaleImage from '../../assets/female.png';
import PopupComponent from './PopupComponent';

const TeacherList = observer(() => {
  useEffect(() => {
    // Fetch teacher data from the API
    teacherStore.fetchTeachers();
  }, []);

  const handleDelete = (teacherId) => {
    teacherStore.deleteTeacher(teacherId);
  };

  const getGenderImage = (gender) => {
    return gender === 'male' ? maleImage : femaleImage;
  };
  const handleEdit = (teacherId) => {
    teacherStore.setCurrentTeacherId(teacherId); // Set the current teacher ID
    teacherStore.setPopupOpen(true); // Open the popup
  };

  return (
    <div className="teacher-list-container">
      <div className="filter-section">
        <div className="filter-select">
          <select
            value={teacherStore.filterType}
            onChange={(e) => teacherStore.setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="firstName">Name</option>
            <option value="subject">Subject</option>
            <option value="class">Class</option>
            <option value="email">Email Address</option>
            <option value="gender">Gender</option>
          </select>
        </div>
        <div className="filter-input">
        <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a student by name or email....."
            value={teacherStore.searchTerm}
            onChange={(e) => teacherStore.setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <table className="teacher-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Class</th>
            <th>Email Address</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {toJS(teacherStore.filteredTeachers).map((teacher, index) => (
            <tr key={index} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
              <td>
                <div className="teacher-info">
                  <img src={getGenderImage(teacher.gender)} alt={teacher.gender} className="gender-image" />
                  {teacher.firstName}
                </div>
              </td>
              <td>{teacher.subject}</td>
              <td>{teacher.class}</td>
              <td>{teacher.email}</td>
              <td>{teacher.gender}</td>
              <td>
                <div className="action-buttons">
                  <button className="edit-button" onClick={() => handleEdit(teacher.id)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(teacher.id)} className="delete-button">
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {teacherStore.isPopupOpen && (
        <PopupComponent
          onSubmit={() => {
            // Handle form submission, e.g., refreshing teacher list
            teacherStore.fetchTeachers();
          }}
          teacherId={teacherStore.currentTeacherId}
        />
      )}
    </div>
  );
});

export default TeacherList;
