import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FaSearch } from 'react-icons/fa';
import { teacherStore } from '../../Store/TeacherStore/TeacherStore';
import DeleteIcon from '../../Component/Actions/DeleteIcon';
import EditIcon from '../../Component/Actions/EditIcon';
import { toJS } from 'mobx';
import Skeleton from 'react-loading-skeleton';
import '../Style/TableStyle.css';
import maleImage from '../../assets/male.png';
import femaleImage from '../../assets/female.png';
import PopupComponent from '../../Component/TeacherComponent/PopupComponent';

const TeacherList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchTeacherData = async () => {
      try {
        await teacherStore.fetchTeachers();
        setIsLoading(false);
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
      }
    };

    fetchTeacherData();
  }, []);

  const handleDelete = (teacherId) => {
    teacherStore.deleteTeacher(teacherId);
  };

  const getGenderImage = (gender) => {
    return gender === 'male' ? maleImage : femaleImage;
  };

  const currentTeachers = teacherStore.filteredTeachers ? toJS(teacherStore.filteredTeachers).slice(
    currentPage * entriesPerPage,
    (currentPage + 1) * entriesPerPage
  ) : [];

  const handleEdit = (teacherId) => {
    teacherStore.setCurrentTeacherId(teacherId);
    teacherStore.setPopupOpen(true);
  };

  const handleFilterTypeChange = (e) => {
    teacherStore.setFilter(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    teacherStore.setSearchTerm(e.target.value);
  };

  const pageCount = teacherStore.filteredTeachers ? Math.ceil(toJS(teacherStore.filteredTeachers).length / entriesPerPage) : 0;

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="list-container">
      <div className="filter-section">
        <div className="filter-select">
          <select
            value={teacherStore.filterType}
            onChange={handleFilterTypeChange}
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
            onChange={handleSearchTermChange}
          />
        </div>
      </div>
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
          {isLoading ? (
            // Show Skeleton while loading
            Array.from({ length: entriesPerPage }).map((_, index) => (
              <tr key={index} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
                <td colSpan="6">
                  <Skeleton height={30} />
                </td>
              </tr>
            ))
          ) : teacherStore.filteredTeachers && teacherStore.filteredTeachers.length === 0 ? (
            // Show a message when there are no teachers
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                No teachers found.
              </td>
            </tr>
          ) : (
            // Render actual data
            currentTeachers.map((teacher, index) => (
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
                    <EditIcon onClick={() => handleEdit(teacher.id)} />
                    <DeleteIcon onClick={() => handleDelete(teacher.id)} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination-container">
        <div className="pagination">
          {/* Pagination buttons */}
          {Array.from({ length: pageCount }).map((_, index) => (
            <button key={index} onClick={() => goToPage(index)} className={currentPage === index ? 'active' : ''}>
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {teacherStore.isPopupOpen && (
        <PopupComponent
          onSubmit={() => {
            teacherStore.fetchTeachers();
          }}
          teacherId={teacherStore.currentTeacherId}
        />
      )}
    </div>
  );
});

export default TeacherList;
