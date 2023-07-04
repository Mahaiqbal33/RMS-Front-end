import React from 'react';
import { observer } from 'mobx-react';
import PopupComponent from '../../Component/TeacherComponent/PopupComponent';
import { teacherStore } from '../../Store/TeacherStore/TeacherStore';
import './Style/Newteacher.css'; // Import the CSS file for styling
import background from '../../assets/background.png'
import { sidebarStore } from '../../Store/Sidebarstore/SideStore';

const NewTeacher = observer(() => {
  const { isPopupOpen, setPopupOpen } = teacherStore;

  const handleAddTeacher = () => {
    setPopupOpen(true);
    sidebarStore.setSidebarOpen(false);
  };

  const handleFormSubmit =() => {
    setPopupOpen(false);
  };

  return (
    <div className="new-teacher-container">
      <div className='newteacher-content-section'>
      <div className="left-section">
        <h2 className="new-teacher-title">Teachers</h2>
      </div>
      <div className="right-section">
        <button className="add-teacher-button" onClick={handleAddTeacher}>
          Add Teacher
        </button>
      </div>
      </div>
      <div className="image-section">
        <img src={background} alt=''></img>
      </div>
      {isPopupOpen && <PopupComponent onSubmit={handleFormSubmit} />}
    </div>
  );
});

export default NewTeacher;
