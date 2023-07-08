import React, { useEffect, lazy, Suspense, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import { subjectsStore } from '../../Store/SubjectsStore/SubjectsStore';
import { toJS } from 'mobx';
import './Style/SubjectsList.css';
import loading from '../../assets/loading.png';

const Subjectpopup = lazy(() => import('../../Component/Subjects/Subjectpopup'));

const SubjectsList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchSubjectData = async () => {
      await subjectsStore.fetchSubjects();
      setIsLoading(false);
    };

    fetchSubjectData();
  }, []);

  const handleDelete = (subjectId) => {
    subjectsStore.deleteSubject(subjectId);
  };

  const handleEdit = (subjectId) => {
    subjectsStore.setCurrentSubjectId(subjectId);
    subjectsStore.setPopupOpen(true);
  };

  const currentSubjects = toJS(subjectsStore.subjects).slice(
    currentPage * entriesPerPage,
    (currentPage + 1) * entriesPerPage
  );

  const pageCount = Math.ceil(toJS(subjectsStore.subjects).length / entriesPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="subject-list-container">
      <div className="filter-section">
        <div className="filter-select">
          <select
            value={subjectsStore.filterType}
            onChange={(e) => subjectsStore.setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="username">Username</option>
            <option value="subject">Subject</option>
            <option value="enrollment">Enrollment</option>
          </select>
        </div>
        <div className="filter-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a subject by username or subject....."
            value={subjectsStore.searchTerm}
            onChange={(e) => subjectsStore.setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="loading-indicator">
          <div><img src={loading} alt='Loading...'/></div>
        </div>
      ) : (
        <React.Fragment>
          <table className="subject-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Subject</th>
                <th>Enrollment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSubjects.map((subject, index) => (
                <tr key={index} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
                  <td>{subject.username}</td>
                  <td>{subject.subject}</td>
                  <td>{subject.enrollment}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(subject.id)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(subject.id)} className="delete-button">
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
      {subjectsStore.isPopupOpen && (
        <Suspense fallback={<div><img src={loading} alt='Loading...'/></div>}>
          <Subjectpopup
            onSubmit={() => {
              subjectsStore.fetchSubjects();
            }}
            subjectId={subjectsStore.currentSubjectId}
          />
        </Suspense>
      )}
    </div>
  );
});

export default SubjectsList;
