import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FaSearch } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "../../Style/TableStyle.css";
import { teachersReportStore } from '../../../Store/ReportsStore/TeachersReportStore';
import   ViewReportPopup  from './ViewReportPopup';

const TeachersReport = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 4;

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        await teachersReportStore.fetchTeacherReports();
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchReportData();
  }, []);


  const handleFilterTypeChange = (e) => {
    teachersReportStore.setTeacherFilterType(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    teachersReportStore.setTeacherSearchTerm(e.target.value);
  };

  const handleViewReport = (reportId) => {
    teachersReportStore.setCurrentTeacherReportId(reportId);
    teachersReportStore.setTeacherPopupOpen(true);
  };
  
  

  const pageCount = Math.ceil(teachersReportStore.teacherTotalPages / entriesPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    teachersReportStore.setCurrentTeacherPage(pageNumber);
    teachersReportStore.fetchTeacherReports();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setCurrentPage(0);
    teachersReportStore.fetchTeacherReports();
    teachersReportStore.teacherFilterType='';
    teachersReportStore.teacherSearchTerm="";
  };

  return (
    <div className="list-container">
     <form className="filter-section" onSubmit={handleSearchSubmit}>
        <div className="filter-select">
          <select
            value={teachersReportStore.teacherFilterType}
            onChange={handleFilterTypeChange}
          >
           <option value="All">All</option>
            <option value="studentName">Name</option>
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
            placeholder="Search for a Report..."
            value={teachersReportStore.teacherSearchTerm}
            onChange={handleSearchTermChange}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      <table className="content-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Subject</th>
            <th>Test Name</th>
            <th>Batch</th>
            <th>Total Marks</th>
            <th>Obtained Marks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
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
          ) : teachersReportStore.teacherReportList.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Reports found.
              </td>
            </tr>
          ) : (
            teachersReportStore.teacherReportList.map((report, index) => (
              <tr
                key={report.id}
                className={index % 2 === 0 ? "white-row" : "blue-row"}
              >
                <td>
                  <div className="table-info">{report.studentName}</div>
                </td>
                <td>{report.username}</td>
                <td>{report.subject}</td>
                <td>{report.testName}</td>
                <td>{report.batch}</td>
                <td>{report.totalMarks}</td>
                <td>{report.obtMarks}</td>
                <td>
                  <div className="action-buttons">
                  <button className="view-button" onClick={() => handleViewReport(report.id)}>View</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="pagination-container">
        <div className="pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Prev
          </button>
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={currentPage === index ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === pageCount - 1}
          >
            Next
          </button>
        </div>
      </div>
      {teachersReportStore.isTeacherPopupOpen &&(
         <ViewReportPopup 
         onSubmit={() => {
           teachersReportStore.fetchTeacherReports();
         }}
         resultId={teachersReportStore.currentTeacherReportId} // Corrected prop name here
       />
      )}

    </div>
  );
});

export default TeachersReport;

