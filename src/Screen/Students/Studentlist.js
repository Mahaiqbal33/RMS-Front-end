import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FaSearch } from "react-icons/fa";
import { StudentStore } from '../../Store/studentStore/studentStore';
import DeleteIcon from "../../Component/Actions/DeleteIcon";
import EditIcon from "../../Component/Actions/EditIcon";
import Skeleton from "react-loading-skeleton";
import "../Style/TableStyle.css";
import maleImage from "../../assets/male.png";
import femaleImage from "../../assets/female.png";
import StudentPopup from '../../Component/Students/studentPopup';

const StudentList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 4;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        await  StudentStore.fetchStudents();
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  const handleDelete = (StudentId) => {
     StudentStore.deleteStudent(StudentId);
  };

  const getGenderImage = (gender) => {
    return gender === "male" ? maleImage : femaleImage;
  };

  const currentStudents =  StudentStore.getStudent.slice(
    currentPage * entriesPerPage,
    (currentPage + 1) * entriesPerPage
  );

  const handleEdit = (StudentId) => {
     StudentStore.setCurrentStudentId(StudentId);
     StudentStore.setPopupOpen(true);
  };

  const handleFilterTypeChange = (e) => {
     StudentStore.setFilter(e.target.value);
  };

  const handleSearchTermChange = (e) => {
     StudentStore.setSearchTerm(e.target.value);
  };

  const pageCount = Math.ceil( StudentStore.totalPages / entriesPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
     StudentStore.setCurrentPage(pageNumber); // Update the current page in the store
     StudentStore.fetchStudents(); // Call the fetchStudents() action in the store
  };

  const handleSearch = () => {
    setCurrentPage(0); // Reset to the first page when performing a new search
     StudentStore.fetchStudents(); // Fetch Students based on the filter and search term
  };

  return (
    <div className="list-container">
      <div className="filter-section">
        <div className="filter-select">
          <select
            value={ StudentStore.filterType}
            onChange={handleFilterTypeChange}
          >
            <option value="All">All</option>
            <option value="name">Name</option>
            <option value="class_name">class_name</option>
            <option value="class">Class</option>
            <option value="username">Username</option>
            <option value="gender">Gender</option>
          </select>
        </div>
        <div className="filter-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a Student by name or email..."
            value={ StudentStore.searchTerm}
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
            <th>class_name</th>
            <th>Gender</th>
            <th>phone_number</th>
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
          ) :  StudentStore.getStudent.length === 0 ? ( // Add a check for undefined
            // Show a message when there are no Students
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Students found.
              </td>
            </tr>
          ) : (
            // Render actual data
             StudentStore.getStudent.map((student, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "white-row" : "blue-row"}
              >
                <td>
                  <div className="table-info">
                    <img
                      src={getGenderImage(student.gender)}
                      alt={student.gender}
                      className="gender-image"
                    />
                    {student.name}
                  </div>
                </td>
                <td>{student.username}</td>
                <td>{student.class_name}</td>
                <td>{student.gender}</td>
                <td>{student.phone_number}</td>
                <td>
                  <div className="action-buttons">
                    <EditIcon onClick={() => handleEdit(student.id)} />
                    <DeleteIcon onClick={() => handleDelete(student.id)} />
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
      { StudentStore.isPopupOpen && (
        <StudentPopup
          onSubmit={() => {
             StudentStore.fetchStudents();
          }}
          StudentId={ StudentStore.currentStudentId}
        />
      )}
    </div>
  );
});

export default StudentList;
