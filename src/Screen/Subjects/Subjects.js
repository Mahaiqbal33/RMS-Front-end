import React from 'react';
import { observer } from 'mobx-react';
import Subjectpopup from '../../Component/Subjects/Subjectpopup';
import { subjectsStore } from '../../Store/SubjectsStore/SubjectsStore';
import './Style/Subject.css'; // Import the CSS file for styling
import background from '../../assets/background.png'
import { sidebarStore } from '../../Store/Sidebarstore/SideStore';

const Subjects =observer( () => {

  const { isPopupOpen, setPopupOpen } = subjectsStore;

  const handleAddsubject =  () => {
    setPopupOpen(true);
    sidebarStore.setSidebarOpen(false);
  };

  const handleFormSubmit =() => {
    setPopupOpen(false);
  };

  return (
    <div className="new-subject-container">
    <div className='newsubject-content-section'>
    <div className="left-section">
      <h2 className="new-subject-title">Subjects</h2>
    </div>
    <div className="right-section">
      <button className="add-subject-button" onClick={handleAddsubject}>
        Add Subject
      </button>
    </div>
    </div>
    <div className="image-section">
      <img src={background} alt=''></img>
    </div>
    {isPopupOpen && <Subjectpopup onSubmit={handleFormSubmit} />}
  </div>
  )
})

export default Subjects
