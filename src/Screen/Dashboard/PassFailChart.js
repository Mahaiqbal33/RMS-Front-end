import React from "react";
import "./Style/Dashboard.css"

const PassFailChart = () => {
    let passPercentage=85;
    let failPercentage=15
  return (
    <div className="pass-fail-chart">
        <div className="percentage-text" style={{marginBottom:"20px"}}>100 Total</div>
      <div className="bar">
        <div className="pass-bar" style={{ width: `${passPercentage}%` }} />
        <div className="fail-bar" style={{ width: `${failPercentage}%` }} />
      </div>
      <div className="labels">
        <div className="label pass-label">
          Pass <br></br>{passPercentage}%  Student
        </div>
        <div className="label fail-label">
          Fail <br></br>{failPercentage}% Student
        </div>
      </div>
    </div>
  );
};

export default PassFailChart;