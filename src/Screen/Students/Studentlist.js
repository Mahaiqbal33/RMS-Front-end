import React, { useEffect, lazy, Suspense, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import { StudentStore } from '../../Store/studentStore/studentStore';
import { toJS } from 'mobx';
import './style/studentList.css';
import loading from '../../assets/loading.png';
import maleImage from '../../assets/male.png';
import femaleImage from '../../assets/female.png';

const StudentPopup = lazy(() => import('../../Component/Students/studentPopup'));

const StudentList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchStudentData = async () => {
      await StudentStore.fetchStudents();
      setIsLoading(false);
    };

    fetchStudentData();
  }, []);

  const handleDelete = (studentId) => {
    StudentStore.deleteStudent(studentId);
  };

  const getGenderImage = (gender) => {
    return gender === 'male' ? maleImage : femaleImage;
  };

  const handleEdit = (studentId) => {
    StudentStore.setCurrentStudentId(studentId);
    StudentStore.setPopupOpen(true);
  };

  const currentStudent = toJS(StudentStore.filteredStudents).slice(
    currentPage * entriesPerPage,
    (currentPage + 1) * entriesPerPage
  );

  const pageCount = Math.ceil(toJS(StudentStore.filteredStudents).length / entriesPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="student-list-container">
      <div className="filter-section">
        <div className="filter-select">
          <select
            value={StudentStore.filterType}
            onChange={(e) => StudentStore.setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="firstName">Name</option>
            <option value="subject">Subject</option>
            <option value="class">Class</option>
            <option value="email">Username</option>
            <option value="gender">Gender</option>
          </select>
        </div>
        <div className="filter-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a student by name or email....."
            value={StudentStore.searchTerm}
            onChange={(e) => StudentStore.searchTerm(e.target.value)}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="loading-indicator">
          <div><img src={loading} alt='Loading...'/></div>
        </div>
      ) : (
        <React.Fragment>
          <table className="student-table">
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
              {currentStudent.map((student, index) => (
                <tr key={index} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
                  <td>
                    <div className="student-info">
                      <img src={getGenderImage(student.gender)} alt={student.gender} className="gender-image" />
                      {student.firstName}
                    </div>
                  </td>
                  <td>{student.subject}</td>
                  <td>{student.class}</td>
                  <td>{student.email}</td>
                  <td>{student.gender}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(student.id)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(student.id)} className="delete-button">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  className={`pagination-button ${currentPage === index ? 'active' : ''}`}
                  onClick={() => goToPage(index)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="pagination-button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === pageCount - 1}
              >
                Next
              </button>
            </div>
          </div>
        </React.Fragment>
      )}
      {StudentStore.isPopupOpen && (
        <Suspense fallback={<div><img src={loading} alt='Loading...'/></div>}>
          <StudentPopup
            onSubmit={() => {
              StudentStore.fetchStudents();
            }}
            studentId={StudentStore.currentStudentId}
          />
        </Suspense>
      )}
    </div>
  );
});

export default StudentList;