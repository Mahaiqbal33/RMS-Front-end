import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FaSearch } from "react-icons/fa";
import {testStore} from "../../Store/TestStore/TestStore"
import DeleteIcon from "../../Component/Actions/DeleteIcon";
import EditIcon from "../../Component/Actions/EditIcon";
import Skeleton from "react-loading-skeleton";
import "../Style/TableStyle.css";
import TestPopupComponent from "../../Component/Test/TestPopupComponent";

const TestList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 4;

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        await testStore.fetchTests();
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchTestData();
  }, []);

  const handleDelete = (TestId) => {
    testStore.deleteTest(TestId);
  };


  const currentTests = testStore.getTest.slice(
    currentPage * entriesPerPage,
    (currentPage + 1) * entriesPerPage
  );

  const handleEdit = (TestId) => {
    testStore.setCurrentTestId(TestId);
    testStore.setPopupOpen(true);
  };

  const handleFilterTypeChange = (e) => {
    testStore.setFilter(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    testStore.setSearchTerm(e.target.value);
  };

  const pageCount = Math.ceil(testStore.totalPages / entriesPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    testStore.setCurrentPage(pageNumber); // Update the current page in the store
    testStore.fetchTests(); // Call the fetchTests() action in the store
  };

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(0); // Reset to the first page when performing a new search
    testStore.fetchTests(); // Fetch Tests based on the filter and search term
    testStore.filterType="";
     testStore.searchTerm="";
  };

  return (
    <div className="list-container">
      <from className="filter-section" onSubmit={handleSearch}>
        <div className="filter-select">
          <select
            value={testStore.filterType}
            onChange={handleFilterTypeChange}
          >
             <option value="All">All</option>
             <option value="name">Name</option>
             <option value="subject">Subject</option>
            <option value="class">Class</option>
            <option value="marks">Marks</option>
          </select>
        </div>
        <div className="filter-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a Test by name or email..."
            value={testStore.searchTerm}
            onChange={handleSearchTermChange}
          />
          <button type="submit">Search</button>
        </div>
      </from>
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
          ) : testStore.getTest.length === 0 ? ( // Add a check for undefined
            // Show a message when there are no Tests
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Tests found.
              </td>
            </tr>
          ) : (
            // Render actual data
            testStore.getTest.map((test, index) => (
              <tr key={test.id} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
              <td>
                <div className="table-info">{test.name}</div>
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
      {testStore.isPopupOpen && (
        <TestPopupComponent
          onSubmit={() => {
            testStore.fetchTests();
          }}
          TestId={testStore.currentTestId}
        />
      )}
    </div>
  );
});

export default TestList;
