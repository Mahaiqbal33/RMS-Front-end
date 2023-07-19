import React from 'react';
import { observer } from 'mobx-react';
import TestPopupComponent from '../../Component/Test/TestPopupComponent';
import { testStore } from '../../Store/TestStore/TestStore';
import "../Style/ScreenStyle.css" // Import the CSS file for styling
import background from '../../assets/background.png'
import { sidebarStore } from '../../Store/Sidebarstore/SideStore';

const NewTest = observer(() => {
  const { isPopupOpen, setPopupOpen } = testStore;

  const handleAddTest = () => {
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
        <h2 className="new-title">Tests</h2>
      </div>
      <div className="right-section">
        <button className="add-button" onClick={handleAddTest}>
          Add Test
        </button>
      </div>
      </div>
      <div className="image-section">
        <img src={background} alt=''></img>
      </div>
      {isPopupOpen && <TestPopupComponent onSubmit={handleFormSubmit} />}
    </div>
  );
});

export default NewTest;
