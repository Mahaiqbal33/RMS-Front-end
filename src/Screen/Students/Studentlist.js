import React, { useEffect, useState, Suspense, lazy } from 'react';
import { observer } from 'mobx-react-lite';
import {  FaSearch } from 'react-icons/fa';
import DeleteIcon from '../../Component/Actions/DeleteIcon';
import EditIcon from '../../Component/Actions/EditIcon';
import { StudentStore } from '../../Store/studentStore/studentStore';
import '../Style/TableStyle.css'
import loading from '../../assets/loading.png';
import maleImage from '../../assets/male.png';
import femaleImage from '../../assets/female.png';
const StudentPopup = lazy(() => import('../../Component/Students/studentPopup'));
const StudentList = observer(() => {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 1;

  useEffect(() => {
    const fetchStudentData = async () => {
      setIsLoading(true); // Set loading to true before fetching data
      await StudentStore.fetchStudents(currentPage, entriesPerPage);
      setIsLoading(false); // Set loading to false after fetching data
    };

    fetchStudentData();
  }, [currentPage, entriesPerPage]);

  const handleDelete = (studentId) => {
    StudentStore.deleteStudent(studentId);
  };

  const handleEdit = (studentId) => {
    StudentStore.setCurrentStudentId(studentId);
    StudentStore.setPopupOpen(true);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pageCount = StudentStore.pageCount;

    const paginationButtons = [];

    // Add Previous button
    paginationButtons.push(
      <button
        key="prev"
        className="pagination-button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
    );

    // Add numbered buttons
    for (let i = 1; i <= pageCount; i++) {
      paginationButtons.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? 'active' : ''}`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }

    // Add Next button
    paginationButtons.push(
      <button
        key="next"
        className="pagination-button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        Next
      </button>
    );

    return paginationButtons;
  };

  const getRangeDisplay = () => {
    const startRange = (currentPage - 1) * entriesPerPage + 1;
    const endRange = Math.min(startRange + entriesPerPage - 1, StudentStore.totalStudents);

    return `${startRange} to ${endRange}`;
  };

  const [isLoading, setIsLoading] = useState(true); // Add state for loading

  return (
    <div className="list-container">
      {/* ... rest of the component code remains the same ... */}
      <div className="filter-section">
        <div className="filter-select">
          <select
            value={StudentStore.filterType}
            onChange={(e) => StudentStore.setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="name">Name</option>
            <option value="username">Uername</option>
            <option value="class">Class</option>
            <option value="batch">Batch</option>
            <option value="gender">Gender</option>
          </select>
        </div>
        <div className="filter-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a student..."
            value={StudentStore.searchTerm}
            onChange={(e) => StudentStore.setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="loading-indicator">
          <img src={loading} alt="Loading..." />
        </div>
      ) : (
        <React.Fragment>
          {/* ... rest of the component code remains the same ... */}
          <table className="content-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Class</th>
                <th>Username</th>
                <th>Gender</th>
                <th>Batch</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {StudentStore.filteredStudents.map((student, index) => (
                <tr key={student.id} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
                  <td>
                    <div className="table-info">
                      <img src={student.gender === 'male' ? maleImage : femaleImage} alt={student.gender} className="gender-image" />
                      {student.name}
                    </div>
                  </td>
                  <td>{student.class_name}</td>
                  <td>{student.username}</td>
                  <td>{student.gender}</td>
                  <td>{student.batch}</td>
                  <td>{student.phone_number}</td>
                  <td>
                    <div className="action-buttons">
                    <EditIcon onClick={() => handleEdit(student.id)} />
                      <DeleteIcon onClick={() => handleDelete(student.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
            <div className="pagination">
              {renderPaginationButtons()}
              <div>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
      {/* ... rest of the component code remains the same ... */}
      {StudentStore.isPopupOpen && (
        <Suspense fallback={<div><img src={loading} alt='Loading...' /></div>}>
          <StudentPopup
            onSubmit={() => {
              StudentStore.fetchStudents(currentPage, entriesPerPage);
            }}
            studentId={StudentStore.currentStudentId}
          />
        </Suspense>
      )}
    </div>
  );
});

export default StudentList;
