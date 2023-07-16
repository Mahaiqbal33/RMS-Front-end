import React, { useEffect, useState,Suspense,lazy } from 'react';
import { observer } from 'mobx-react-lite';
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import { resultStore } from '../../Store/ResultStore/ResultStore';
import './Style/Result.css'
import loading from '../../assets/loading.png';
import maleImage from '../../assets/male.png';
import femaleImage from '../../assets/female.png';
const Resultpopup= lazy(() => import('../../Component/Result/Resultpopup'));
const ResultList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchresultData = async () => {
      await resultStore.fetchresult();
      setIsLoading(false);
    };

    fetchresultData();
  }, []);

  const handleDelete = (resultId) => {
    resultStore.deleteresult(resultId);
  };

  const handleEdit = (resultId) => {
    resultStore.setCurrentresultId(resultId);
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

  const getRangeDisplay = () => {
    const startRange = (currentPage - 1) * entriesPerPage + 1;
    const endRange = Math.min(startRange + entriesPerPage - 1, resultStore.totalresult);

    return `${startRange} to ${endRange}`;
  };

  return (
    <div className="result-list-container">
      <div className="filter-section">
        <div className="filter-select">
          <select
            value={resultStore.filterType}
            onChange={(e) => resultStore.setFilter(e.target.value)}
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
            placeholder="Search for a result..."
            value={resultStore.searchTerm}
            onChange={(e) => resultStore.setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="loading-indicator">
          <img src={loading} alt="Loading..." />
        </div>
      ) : (
        <React.Fragment>
          <table className="result-table">
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
              {resultStore.filteredresult.map((result, index) => (
                <tr key={result.id} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
                  <td>
                    <div className="result-info">
                      <img src={result.gender === 'male' ? maleImage : femaleImage} alt={result.gender} className="gender-image" />
                      {result.name}
                    </div>
                  </td>
                  <td>{result.class_name}</td>
                  <td>{result.username}</td>
                  <td>{result.gender}</td>
                  <td>{result.batch}</td>
                  <td>{result.phone_number}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(result.id)}>
                        <FaEdit />
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(result.id)}>
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
              <div className="range-display">Showing {getRangeDisplay()} of {resultStore.totalresult} entries</div>
              {renderPaginationButtons()}
            </div>
          </div>
        </React.Fragment>
      )}
      {resultStore.isPopupOpen && (
        <Suspense fallback={<div><img src={loading} alt='Loading...'/></div>}>
          <Resultpopup
            onSubmit={() => {
              resultStore.fetchresult();
            }}
            resultId={resultStore.currentresultId}
          />
        </Suspense>
      )}
    </div>
  );
});

export default ResultList;
