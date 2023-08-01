import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { FaSearch } from "react-icons/fa";
import {subjectsStore} from '../../Store/SubjectsStore/SubjectsStore';
import DeleteIcon from "../../Component/Actions/DeleteIcon";
import EditIcon from "../../Component/Actions/EditIcon";
import Skeleton from "react-loading-skeleton";
import "../Style/TableStyle.css";
import maleImage from "../../assets/male.png";
import femaleImage from "../../assets/female.png";
import PopupComponent from "../../Component/Subjects/Subjectpopup";

const SubjectList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 4;

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        await subjectsStore.fetchSubjects();
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    };

    fetchSubjectData();
  }, []);

  const handleDelete = (subjectId) => {
    subjectsStore.deleteSubject(subjectId);
  };

  const getGenderImage = (gender) => {
    return gender === "male" ? maleImage : femaleImage;
  };

  const currentSubjects = subjectsStore.getSubject.slice(
    currentPage * entriesPerPage,
    (currentPage + 1) * entriesPerPage
  );

  const handleEdit = (subjectId) => {
    subjectsStore.setCurrentSubjectId(subjectId);
    subjectsStore.setPopupOpen(true);
  };

  const handleFilterTypeChange = (e) => {
    subjectsStore.setFilter(e.target.value);
  };

  const handleSearchTermChange = (e) => {
    subjectsStore.setSearchTerm(e.target.value);
  };

  const pageCount = Math.ceil(subjectsStore.totalPages / entriesPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    subjectsStore.setCurrentPage(pageNumber); // Update the current page in the store
    subjectsStore.fetchSubjects(); // Call the fetchSubjects() action in the store
  };

  const handleSearch = () => {
    setCurrentPage(0); // Reset to the first page when performing a new search
    subjectsStore.fetchSubjects(); // Fetch Subjects based on the filter and search term
  };

  return (
    <div className="list-container">
      <div className="filter-section">
        <div className="filter-select">
          <select
            value={subjectsStore.filterType}
            onChange={handleFilterTypeChange}
          >
            <option value="All">All</option>
            <option value="name">Name</option>
            <option value="subject">Subject</option>
            <option value="username">Username</option>
            <option value="phone_number">phone_number</option>
            <option value="gender">Gender</option>
          </select>
        </div>
        <div className="filter-input">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for a Subject by name or email..."
            value={subjectsStore.searchTerm}
            onChange={handleSearchTermChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <table className="content-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Username</th>
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
          ) : subjectsStore.getSubject.length === 0 ? ( // Add a check for undefined
            // Show a message when there are no Subjects
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Subjects found.
              </td>
            </tr>
          ) : (
            // Render actual data
            subjectsStore.getSubject.map((Subject, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "white-row" : "blue-row"}
              >
                <td>
                  <div className="table-info">
                    <img
                      src={getGenderImage(Subject.gender)}
                      alt={Subject.gender}
                      className="gender-image"
                    />
                    {Subject.name}
                  </div>
                </td>
                <td>{Subject.subject}</td>
                <td>{Subject.username}</td>
                <td>{Subject.gender}</td>
                <td>{Subject.phone_number}</td>
                <td>
                  <div className="action-buttons">
                    <EditIcon onClick={() => handleEdit(Subject.id)} />
                    <DeleteIcon onClick={() => handleDelete(Subject.id)} />
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
      {subjectsStore.isPopupOpen && (
        <PopupComponent
          onSubmit={() => {
            subjectsStore.fetchSubjects();
          }}
          SubjectId={subjectsStore.currentSubjectId}
        />
      )}
    </div>
  );
});

export default SubjectList;
