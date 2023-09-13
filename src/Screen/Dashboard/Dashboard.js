import React,{ useState,useEffect} from 'react'
import { IoIosInformationCircle } from 'react-icons/io'; 
import "./Style/Dashboard.css"
import {dashboardStore} from "../../Store/DashboardStore/DashboardStore"
import PieChartDemo from "./PieChartDemo"; 
import LineChartDemo from './LineChartDemo';
import PassFailChart from './PassFailChart';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dashboardStore.fetchDataAndSetCounts();
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);
 
  
  const overallPercentage = 80; // You can replace this with your calculated value

  if (loading) {
    return (
      <div className="loading-container">
        <p className="loading-message">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <>
    <div className="box">
    <div className="rectangle-wrapper">
        <div className="rectangle">
          Teachers <br />
          {dashboardStore.totalTeachers}
        </div>
        <div className="more-info">
          <div>More info</div>
          <div className="more-info-icon">
            <IoIosInformationCircle />
          </div>
        </div>
      </div>
      <div className="rectangle-wrapper">
        <div className="rectangle">
          1st years <br />
          {dashboardStore.totalFirstYearStudents}
        </div>
        <div className="more-info">
          <div>More info</div>
          <div className="more-info-icon">
            <IoIosInformationCircle />
          </div>
        </div>
      </div>
      <div className="rectangle-wrapper">
        <div className="rectangle">
          2nd years <br />
          {dashboardStore.totalSecondYearStudents}
        </div>
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