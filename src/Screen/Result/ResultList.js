import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FaSearch } from "react-icons/fa";
import DeleteIcon from "../../Component/Actions/DeleteIcon";
import EditIcon from "../../Component/Actions/EditIcon";
import Skeleton from "react-loading-skeleton";
import "../Style/TableStyle.css";
import { resultStore } from '../../Store/ResultStore/ResultStore';
import Resultpopup from "../../Component/Result/Resultpopup";


const ResultList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 4;

  useEffect(() => {
    const fetchResultData = async () => {
      try {
        await resultStore.fetchResults();
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchResultData();
  }, []);

  const handleDelete = (ResultId) => {
    resultStore.deleteResult(ResultId);
  };

  const currentResults = resultStore.getResult.slice(
    currentPage * entriesPerPage,
    (currentPage + 1) * entriesPerPage
  );

  const handleEdit = (ResultId) => {
    resultStore. setCurrentResultId(ResultId);
    resultStore.setPopupOpen(true);
  };

  const handleFilterTypeChange = (e) => {
    resultStore.setFilter(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    resultStore.setSearchTerm(e.target.value);
  };

  const pageCount = Math.ceil(resultStore.totalPages / entriesPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    resultStore.setCurrentPage(pageNumber); // Update the current page in the store
    resultStore.fetchResults(); // Call the fetchResults() action in the store
  };

  const handleSearch = () => {
    setCurrentPage(0); // Reset to the first page when performing a new search
    resultStore.fetchResults(); // Fetch Results based on the filter and search term
  };

  return (
    <div className="list-container">
      <div className="filter-section">
        <div className="filter-select">
          <select
            value={resultStore.filterType}
            onChange={handleFilterTypeChange}
          >
            <option value="All">All</option>
            <option value="name">Name</option>
            <option value="username">Username</option>
            <option value="subject">Subject</option>
            <option value="obtMarks">Obt_Marks</option>
            <option value="testName">Test_Name</option>
            <option value="batch">Batch</option>
          </select>
        </div>
        <div className="filter-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a Result by name or email..."
            value={resultStore.searchTerm}
            onChange={handleSearchTermChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <table className="content-table">
        <thead>
          <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Subject</th>
           <th>Test_Name</th>
           <th>Batch</th>
           <th>Total_Marks</th>
           <th>Obt_Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Show Skeleton while loading
            Array.from({ length: entriesPerPage }).map((_, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "white-row" : "blue-row"}
              >
                <td colSpan="6">
                  <Skeleton height={30} />
                </td>
              </tr>
            ))
          ) : resultStore.getResult.length === 0 ? ( // Add a check for undefined
            // Show a message when there are no Results
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Results found.
              </td>
            </tr>
          ) : (
            // Render actual data
            resultStore.getResult.map((result, index) => (
              <tr key={result.id} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
              <td>
                <div className="table-info">
                  {result.studentName}
                </div>
              </td>
              <td>{result.username}</td>
              <td>{result.subject}</td>
              <td>{result.testName}</td>
              <td>{result.batch}</td>
              <td>{result.totalMarks}</td>
              <td>{result.obtMarks}</td>
              <td>
                <div className="action-buttons">
                <EditIcon onClick={() => handleEdit(result.id)} />
                  <DeleteIcon onClick={() => handleDelete(result.id)} />
                </div>
              </td>
            </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination-container">
      <div className="pagination">
          {/* Previous Button */}
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Prev
          </button>
          {/* Numbered Buttons */}
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={currentPage === index ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === pageCount - 1}
          >
            Next
          </button>
        </div>
      </div>
      {resultStore.isPopupOpen && (
  <Resultpopup
    onSubmit={() => {
      resultStore.fetchResults();
    }}
    resultId={resultStore.currentResultId} // Corrected prop name here
  />
)}
    </div>
  );
});

export default ResultList;
