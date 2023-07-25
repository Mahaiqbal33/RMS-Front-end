import React, { useEffect, useState, Suspense, lazy } from 'react';
import { observer } from 'mobx-react-lite';
import { FaSearch } from 'react-icons/fa';
import DeleteIcon from '../../Component/Actions/DeleteIcon';
import EditIcon from '../../Component/Actions/EditIcon';
import {testStore } from '../../Store/TestStore/TestStore';
import '../Style/TableStyle.css';
import loading from '../../assets/loading.png';

const TestPopupComponent = lazy(() => import('../../Component/Test/TestPopupComponent'));

const TestList = observer(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestData = async () => {
      await testStore.fetchtests(); // Fetch all the data at once without pagination
      setIsLoading(false);
    };

    fetchTestData();
  }, []);

  // const handleDelete = (testId) => {
  //   testStore.deletetest(testId);
  // };

  // const handleEdit = (testId) => {
  //   testStore.setCurrenttestId(testId);
  //   testStore.setPopupOpen(true);
  // };

  return (
    <div className="list-container">
      <div className="filter-section">
        <div className="filter-select">
          <select value={testStore.filterType}>
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
              {/* {testStore.getTest.map((test, index) => (
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
              ))} */}
            </tbody>
          </table>
        </React.Fragment>
      )}
      {testStore.isPopupOpen && (
        <Suspense fallback={<div><img src={loading} alt='Loading...'/></div>}>
          <TestPopupComponent
            onSubmit={() => {
              testStore.fetchtests();
            }}
            testId={testStore.currentTestId}
          />
        </Suspense>
      )}
    </div>
  );
});

export default TestList;
