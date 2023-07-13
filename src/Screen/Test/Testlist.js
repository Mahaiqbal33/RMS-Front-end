import React, { useEffect, lazy, Suspense, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import { testStore } from '../../Store/TestStore/TestStore';
import { toJS } from 'mobx';
import './Style/TestList.css' 
import loading from '../../assets/loading.png';
import maleImage from '../../assets/male.png';
import femaleImage from '../../assets/female.png';

const TestPopupComponent = lazy(() => import('../../Component/Test/TestPopupComponent'));

const TestList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchtestData = async () => {
      await testStore.fetchtests();
      setIsLoading(false);
    };

    fetchtestData();
  }, []);

  const handleDelete = (testId) => {
    testStore.deletetest(testId);
  };

  const getGenderImage = (gender) => {
    return gender === 'male' ? maleImage : femaleImage;
  };

  const handleEdit = (testId) => {
    testStore.setCurrenttestId(testId);
    testStore.setPopupOpen(true);
  };

  const currenttests = toJS(testStore.filteredtests).slice(
    currentPage * entriesPerPage,
    (currentPage + 1) * entriesPerPage
  );

  const pageCount = Math.ceil(toJS(testStore.filteredtests).length / entriesPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="test-list-container">
      <div className="filter-section">
        <div className="filter-select">
          <select
            value={testStore.filterType}
            onChange={(e) => testStore.setFilter(e.target.value)}
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
            value={testStore.searchTerm}
            onChange={(e) => testStore.setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="loading-indicator">
          <div><img src={loading} alt='Loading...'/></div>
        </div>
      ) : (
        <React.Fragment>
          <table className="test-table">
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
              {currenttests.map((test, index) => (
                <tr key={index} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
                  <td>
                    <div className="test-info">
                      <img src={getGenderImage(test.gender)} alt={test.gender} className="gender-image" />
                      {test.firstName}
                    </div>
                  </td>
                  <td>{test.subject}</td>
                  <td>{test.class}</td>
                  <td>{test.email}</td>
                  <td>{test.gender}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(test.id)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(test.id)} className="delete-button">
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
      {testStore.isPopupOpen && (
        <Suspense fallback={<div><img src={loading} alt='Loading...'/></div>}>
          <TestPopupComponent
            onSubmit={() => {
              testStore.fetchtests();
            }}
            testId={testStore.currenttestId}
          />
        </Suspense>
      )}
    </div>
  );
});

export default TestList;


