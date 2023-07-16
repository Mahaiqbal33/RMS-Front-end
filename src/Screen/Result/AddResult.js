import React from 'react';
import { observer } from 'mobx-react';
import Resultpopup from '../../Component/Result/Resultpopup';
import { resultStore } from '../../Store/ResultStore/ResultStore';
import './Style/Result.css'; // Import the CSS file for styling
import background from '../../assets/background.png'
import { sidebarStore } from '../../Store/Sidebarstore/SideStore';

const AddResult =observer( () => {

  const { isPopupOpen, setPopupOpen } = resultStore;

  const handleAddresult =  () => {
    setPopupOpen(true);
    sidebarStore.setSidebarOpen(false);
  };

  const handleFormSubmit =() => {
    setPopupOpen(false);
  };

  return (
    <div className="new-result-container">
    <div className='newresult-content-section'>
    <div className="left-section">
      <h2 className="new-result-title">Results</h2>
    </div>
    <div className="right-section">
      <button className="add-result-button" onClick={handleAddresult}>
        Add Result
      </button>
    </div>
    </div>
    <div className="image-section">
      <img src={background} alt=''></img>
    </div>
    {isPopupOpen && <Resultpopup onSubmit={handleFormSubmit} />}
  </div>
  )
})

export default AddResult
