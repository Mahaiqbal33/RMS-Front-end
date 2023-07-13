import React from 'react';
import { observer } from 'mobx-react';
import StudentPopup from '../../Component/Students/studentPopup';
import { StudentStore } from '../../Store/studentStore/studentStore';
import './style/Students.css'; // Import the CSS file for styling
import background from '../../assets/background.png'
import { sidebarStore } from '../../Store/Sidebarstore/SideStore';

const newStudent = observer(() => {
  const { isPopupOpen, setPopupOpen } = StudentStore;

  const handleAddStudent = () => {
    setPopupOpen(true);
    sidebarStore.setSidebarOpen(false);
  };

  const handleFormSubmit =() => {
    setPopupOpen(false);
  };

  return (
    <div className="new-student-container">
      <div className='newstudent-content-section'>
      <div className="left-section">
        <h2 className="new-student-title">Students</h2>
      </div>
      <div className="right-section">
        <button className="add-student-button" onClick={handleAddStudent}>
          Add Student
        </button>
      </div>
      </div>
      <div className="image-section">
        <img src={background} alt=''></img>
      </div>
      {isPopupOpen && <StudentPopup onSubmit={handleFormSubmit} />}
    </div>
  );
});

export default newStudent;