import React from 'react';
import { observer } from 'mobx-react';
import PopupComponent from '../../Component/TeacherComponent/PopupComponent';
import { teacherStore } from '../../Store/TeacherStore/TeacherStore';
import background from '../../assets/background.png'
import { sidebarStore } from '../../Store/Sidebarstore/SideStore';
import "../Style/ScreenStyle.css" // Import the CSS file for styling

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
    <div className="new-container">
      <div className='new-content-section'>
      <div className="left-section">
        <h2 className="new-title">Teachers</h2>
      </div>
      <div className="right-section">
        <button className="add-button" onClick={handleAddTeacher}>
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
