import React, { useEffect, useState, Suspense, lazy } from 'react';
import { observer } from 'mobx-react-lite';
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import { resultStore } from '../../Store/ResultStore/ResultStore';
import '../Style/TableStyle.css'
import loading from '../../assets/loading.png';

const ResultPopupComponent = lazy(() => import('../../Component/Result/Resultpopup'));

const ResultList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchResultData = async () => {
      await resultStore.fetchresult(currentPage, entriesPerPage);
      setIsLoading(false);
    };

    fetchResultData();
  }, [currentPage, entriesPerPage]);

  const handleDelete = (resultId) => {
    resultStore.deleteResult(resultId);
  };

  const handleEdit = (resultId) => {
    resultStore.setCurrentResultId(resultId);
    resultStore.setPopupOpen(true);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const pageCount = resultStore.pageCount;

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
            value={resultStore.filterType}
            onChange={(e) => resultStore.setFilter(e.target.value)}
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
            value={resultStore.searchTerm}
            onChange={(e) => resultStore.setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="loading-indicator">
          <div>
            <img src={loading} alt="Loading..." />
          </div>
        </div>
      ) : !resultStore.filteredResults?.length ?(
        <div className="no-results-message">No Result  found at that time.</div>
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
              {resultStore.filteredResults.map((result, index) => (
                <tr key={result.id} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
                  <td>
                    <div className="table-info">
                      {result.name}
                    </div>
                  </td>
                  <td>{result.subject}</td>
                  <td>{result.class}</td>
                  <td>{result.marks}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(result.id)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(result.id)} className="delete-button">
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
              {renderPaginationButtons()}
            </div>
          </div>
        </React.Fragment>
      )}
      {resultStore.isPopupOpen && (
        <Suspense fallback={<div><img src={loading} alt='Loading...'/></div>}>
          <ResultPopupComponent
            onSubmit={() => {
              resultStore.fetchresult(currentPage, entriesPerPage);
            }}
            resultId={resultStore.currentResultId}
          />
        </Suspense>
      )}
    </div>
  );
});

export default ResultList;
