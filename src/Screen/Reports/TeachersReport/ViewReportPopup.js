import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import "./ViewReportPopup.css";
import { MdClose } from "react-icons/md"; // Import the close icon
import { teachersReportStore } from "../../../Store/ReportsStore/TeachersReportStore";

const ViewReportPopup = observer(({ resultId }) => {
  const report = teachersReportStore.getTeacherReportById(resultId);
console.log("..>", report);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const handleDownload = () => {
    // Implement your download logic here
    // For example, generate a CSV or PDF and trigger a download
  };
 
  return (
    <div
      className={`report-popup ${
        teachersReportStore.isTeacherPopupOpen ? "open" : ""
      }`}
    >
      <div className="popup-table">
      <div className="popup-Close-main">
        <MdClose className="close-icon" onClick={() => teachersReportStore.setTeacherPopupOpen(false)} />
      </div>
        <div className="report-filters">
          <div className="year-buttons">
            <button
              className="Classes-button"
              onClick={() => setSelectedYear(new Date().getFullYear() - 1)}
            >
              First Year
            </button>
            <button
              className="Classes-button"
              onClick={() => setSelectedYear(new Date().getFullYear())}
            >
              Second Year
            </button>
          </div>
          <div className="month-year-select">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              <option value="">Select Month</option>
              <option value="January-2023">January 2023</option>
              <option value="February-2023">February 2023</option>
              {/* Add more months */}
            </select>
          </div>
        </div>
        {resultId.length > 0 ? (
          <table className="report-table">
            {/* Table contents */}
            <thead>
              <tr>
                <th>Total Student</th>
                <th>Pass</th>
                <th>Fail</th>
                <th>Percentage</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{report.studentName}</td>
                <td>{report.studentName}</td>
                <td>{report.studentName}</td>
                <td>{report.studentName}</td>
                <td>{report.studentName}</td>
                <td>{report.studentName}</td>
                </tr>
              </tbody>
          </table>
        ) : (
          <p>No data available for the selected month and year.</p>
        )}
         <button className="download-button" onClick={handleDownload}>
            Download Report
          </button>
          </div>
    </div>
  );
});
export default ViewReportPopup;
