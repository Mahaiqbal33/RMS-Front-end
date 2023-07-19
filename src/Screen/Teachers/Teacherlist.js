import React, { useEffect, lazy, Suspense, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import { teacherStore } from '../../Store/TeacherStore/TeacherStore';
import { toJS } from 'mobx';
import '../Style/TableStyle.css'
import loading from '../../assets/loading.png';
import maleImage from '../../assets/male.png';
import femaleImage from '../../assets/female.png';

const PopupComponent = lazy(() => import('../../Component/TeacherComponent/PopupComponent'));

const TeacherList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchTeacherData = async () => {
      await teacherStore.fetchTeachers();
      setIsLoading(false);
    };

    fetchTeacherData();
  }, []);

  const handleDelete = (teacherId) => {
    teacherStore.deleteTeacher(teacherId);
  };

  const getGenderImage = (gender) => {
    return gender === 'male' ? maleImage : femaleImage;
  };

  const handleEdit = (teacherId) => {
    teacherStore.setCurrentTeacherId(teacherId);
    teacherStore.setPopupOpen(true);
  };

  const currentTeachers = toJS(teacherStore.filteredTeachers).slice(
    currentPage * entriesPerPage,
    (currentPage + 1) * entriesPerPage
  );

  const pageCount = Math.ceil(toJS(teacherStore.filteredTeachers).length / entriesPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="list-container">
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
            <option value="email">Username</option>
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
      {isLoading ? (
        <div className="loading-indicator">
          <div><img src={loading} alt='Loading...'/></div>
        </div>
      ) : (
        <React.Fragment>
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
              {currentTeachers.map((teacher, index) => (
                <tr key={index} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
                  <td>
                    <div className="table-info">
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
      {teacherStore.isPopupOpen && (
        <Suspense fallback={<div><img src={loading} alt='Loading...'/></div>}>
          <PopupComponent
            onSubmit={() => {
              teacherStore.fetchTeachers();
            }}
            teacherId={teacherStore.currentTeacherId}
          />
        </Suspense>
      )}
    </div>
  );
});

export default TeacherList;


