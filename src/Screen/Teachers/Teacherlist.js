import React, { useEffect, lazy, Suspense, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import { teacherStore } from '../../Store/TeacherStore/TeacherStore';
import { toJS } from 'mobx';
import './Style/TeacherList.css';
import loading from '../../assets/loading.png';
import maleImage from '../../assets/male.png';
import femaleImage from '../../assets/female.png';

const PopupComponent = lazy(() => import('../../Component/TeacherComponent/PopupComponent'));

const TeacherList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const entriesPerPage = 10;

  useEffect(() => {
    const fetchTeacherData = async () => {
      await teacherStore.fetchTeachers();
      setIsLoading(false);
    };

    fetchTeacherData();
  }, []);

  const handleDelete = (teacherId) => {
    teacherStore.deleteTeacher(teacherId);
  };

  const getGenderImage = (gender) => {
    return gender === 'male' ? maleImage : femaleImage;
  };

  const handleEdit = (teacherId) => {
    teacherStore.setCurrentTeacherId(teacherId);
    teacherStore.setPopupOpen(true);
  };

  const currentTeachers = toJS(teacherStore.filteredTeachers).slice(
    currentPage * entriesPerPage,
    (currentPage + 1) * entriesPerPage
  );

  const pageCount = Math.ceil(toJS(teacherStore.filteredTeachers).length / entriesPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="teacher-list-container">
      <div className="filter-section">
        <div className="filter-select">
          <select
            value={teacherStore.filterType}
            onChange={(e) => teacherStore.setFilter(e.target.value)}
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
            value={teacherStore.searchTerm}
            onChange={(e) => teacherStore.setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="loading-indicator">
          <div><img src={loading} alt='Loading...'/></div>
        </div>
      ) : (
        <React.Fragment>
          <table className="teacher-table">
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
              {currentTeachers.map((teacher, index) => (
                <tr key={index} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
                  <td>
                    <div className="teacher-info">
                      <img src={getGenderImage(teacher.gender)} alt={teacher.gender} className="gender-image" />
                      {teacher.firstName}
                    </div>
                  </td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.class}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.gender}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="edit-button" onClick={() => handleEdit(teacher.id)}>
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(teacher.id)} className="delete-button">
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
      {teacherStore.isPopupOpen && (
        <Suspense fallback={<div><img src={loading} alt='Loading...'/></div>}>
          <PopupComponent
            onSubmit={() => {
              teacherStore.fetchTeachers();
            }}
            teacherId={teacherStore.currentTeacherId}
          />
        </Suspense>
      )}
    </div>
  );
});

export default TeacherList;

// import React, { useEffect, lazy, Suspense, useState } from 'react';
// import { observer } from 'mobx-react-lite';
// import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
// import { teacherStore } from '../../Store/TeacherStore/TeacherStore';
// import { toJS } from 'mobx';
// import './Style/TeacherList.css';
// import loading from '../../assets/loading.png';
// import maleImage from '../../assets/male.png';
// import femaleImage from '../../assets/female.png';
// import Pagination from 'react-js-pagination';

// const PopupComponent = lazy(() => import('../../Component/TeacherComponent/PopupComponent'));

// const TeacherList = observer(() => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10; // Number of items per page

//   useEffect(() => {
//     const fetchTeacherData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await teacherStore.fetchTeachers(currentPage, pageSize);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(error);
//         setIsLoading(false);
//       }
//     };

//     fetchTeacherData();
//   }, [currentPage]);

//   const handleDelete = (teacherId) => {
//     teacherStore.deleteTeacher(teacherId);
//   };

//   const getGenderImage = (gender) => {
//     return gender === 'male' ? maleImage : femaleImage;
//   };

//   const handleEdit = (teacherId) => {
//     teacherStore.setCurrentTeacherId(teacherId);
//     teacherStore.setPopupOpen(true);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const renderTeachers = () => {
//     const teachers = toJS(teacherStore.filteredTeachers);

//     // Calculate pagination boundaries
//     const startIndex = (currentPage - 1) * pageSize;
//     const endIndex = startIndex + pageSize;
//     const currentTeachers = teachers.slice(startIndex, endIndex);

//     return currentTeachers.map((teacher, index) => (
//       <tr key={index} className={index % 2 === 0 ? 'white-row' : 'blue-row'}>
//         <td>
//           <div className="teacher-info">
//             <img src={getGenderImage(teacher.gender)} alt={teacher.gender} className="gender-image" />
//             {teacher.firstName}
//           </div>
//         </td>
//         <td>{teacher.subject}</td>
//         <td>{teacher.class}</td>
//         <td>{teacher.email}</td>
//         <td>{teacher.gender}</td>
//         <td>
//           <div className="action-buttons">
//             <button className="edit-button" onClick={() => handleEdit(teacher.id)}>
//               <FaEdit />
//             </button>
//             <button onClick={() => handleDelete(teacher.id)} className="delete-button">
//               <FaTrash />
//             </button>
//           </div>
//         </td>
//       </tr>
//     ));
//   };

//   // Calculate the total number of items (teachers) before any filtering is applied
//   const totalItemsCount = teacherStore.teachers ? teacherStore.teachers.length :0;


//   return (
//     <div className="teacher-list-container">
//       <div className="filter-section">
//         <div className="filter-select">
//           <select
//             value={teacherStore.filterType}
//             onChange={(e) => teacherStore.setFilter(e.target.value)}
//           >
//             <option value="All">All</option>
//             <option value="firstName">Name</option>
//             <option value="subject">Subject</option>
//             <option value="class">Class</option>
//             <option value="email">Username</option>
//             <option value="gender">Gender</option>
//           </select>
//         </div>
//         <div className="filter-input">
//           <FaSearch className="search-icon" />
//           <input
//             type="text"
//             placeholder="Search for a student by name or email....."
//             value={teacherStore.searchTerm}
//             onChange={(e) => teacherStore.setSearchTerm(e.target.value)}
//           />
//         </div>
//       </div>
//       {isLoading ? (
//         <div className="loading-indicator">
//           <div><img src={loading} alt='Loading...'/></div>
//         </div>
//       ) : (
//         <React.Fragment>
//           <table className="teacher-table">
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Subject</th>
//                 <th>Class</th>
//                 <th>Username</th>
//                 <th>Gender</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {renderTeachers()}
//             </tbody>
//           </table>
//           <div className="pagination-container">
//             <Pagination
//               activePage={currentPage}
//               itemsCountPerPage={pageSize}
//               totalItemsCount={totalItemsCount}
//               pageRangeDisplayed={5}
//               onChange={handlePageChange}
//               itemClass="page-item"
//               linkClass="page-link"
//             />
//           </div>
//         </React.Fragment>
//       )}
//       {teacherStore.isPopupOpen && (
//         <Suspense fallback={<div><img src={loading} alt='Loading...'/></div>}>
//           <PopupComponent
//             onSubmit={() => {
//               teacherStore.fetchTeachers(currentPage, pageSize);
//             }}
//             teacherId={teacherStore.currentTeacherId}
//           />
//         </Suspense>
//       )}
//     </div>
//   );
// });

// export default TeacherList;
