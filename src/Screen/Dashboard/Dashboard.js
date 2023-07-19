import React from 'react'
import { IoIosInformationCircle } from 'react-icons/io'; // Import the icon component from react-icons
import "./Style/Dashboard.css"
import PieChartDemo from "./PieChartDemo"; // Import the PieChartDemo component
import LineChartDemo from './LineChartDemo';
import PassFailChart from './PassFailChart';
const Dashboard = () => {
  const overallPercentage = 80; // You can replace this with your calculated value
  return (
    <>
    <div className="box">
      <div className="rectangle-wrapper">
       <div className="rectangle" > Teachers <br></br>10 </div>
        <div className="more-info">
          <div>More info</div>
          <div className="more-info-icon">
            <IoIosInformationCircle />
          </div>
        </div>
      </div>
      <div className="rectangle-wrapper">
       <div className="rectangle" > 1st years <br/> 25</div>
        <div className="more-info">
          <div>More info</div>
          <div className="more-info-icon">
            <IoIosInformationCircle />
          </div>
        </div>
      </div>
      <div className="rectangle-wrapper">
       <div className="rectangle" > 2nd years <br/> 25</div>
       <div className="more-info">
          <div>More info</div>
          <div className="more-info-icon">
            <IoIosInformationCircle />
          </div>
        </div>
      </div>
    </div>
    <div className='Chart-main'>
    <LineChartDemo/>
    <div className='pie-main'>
    <PieChartDemo overallPercentage={overallPercentage} />
    <PassFailChart/>
    </div>
   
    </div>
    </>
   
  )
}

export default Dashboard