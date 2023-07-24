import React, { useEffect, useState, Suspense, lazy } from 'react';
import { observer } from 'mobx-react-lite';
import {  FaSearch } from 'react-icons/fa';
import DeleteIcon from '../../Component/Actions/DeleteIcon';
import EditIcon from '../../Component/Actions/EditIcon';
import { testStore } from '../../Store/TestStore/TestStore';
import '../Style/TableStyle.css'
import loading from '../../assets/loading.png';


const TestPopupComponent = lazy(() => import('../../Component/Test/TestPopupComponent'));

const TestList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchTestData = async () => {
      await testStore.fetchtests(currentPage, entriesPerPage);
      setIsLoading(false);
    };

    fetchTestData();
  }, [currentPage, entriesPerPage]);

  const handleDelete = (testId) => {
    testStore.deletetest(testId);
  };

  const handleEdit = (testId) => {
    testStore.setCurrenttestId(testId);
    testStore.setPopupOpen(true);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pageCount = testStore.pageCount;

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

  return (
    <div className="list-container">
      <div className="filter-section">
        <div className="filter-select">
          <select
            value={testStore.filterType}
            onChange={(e) => testStore.setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="name">Name</option>
            <option value="subject">Subject</option>
            <option value="class">Class</option>
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
          <div>
            <img src={loading} alt="Loading..." />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <table className="content-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testStore.filteredtests.map((test, index) => (
                <tr key={test.id} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
                  <td>
                    <div className="table-info">
                      {test.name}
                    </div>
                  </td>
                  <td>{test.subject}</td>
                  <td>{test.class}</td>
                  <td>{test.marks}</td>
                  <td>
                    <div className="action-buttons">
                    <EditIcon onClick={() => handleEdit(test.id)} />
                      <DeleteIcon onClick={() => handleDelete(test.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
            <div className="pagination">
              {renderPaginationButtons()}
            </div>
          </div>
        </React.Fragment>
      )}
      {testStore.isPopupOpen && (
        <Suspense fallback={<div><img src={loading} alt='Loading...'/></div>}>
          <TestPopupComponent
            onSubmit={() => {
              testStore.fetchtests(currentPage, entriesPerPage);
            }}
            testId={testStore.currentTestId}
          />
        </Suspense>
      )}
    </div>
  );
});

export default TestList;
