import React, { useState } from "react";
import Chart from "react-apexcharts";

const LineChartDemo = () => {
  const [selectedMonthYear, setSelectedMonthYear] = useState("January 2023");

  const handleMonthYearChange = (e) => {
    setSelectedMonthYear(e.target.value);
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = ["2023", "2022", "2021"]; // Add other years here

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: months,
      labels: {
        style: {
          colors: "#ffffff", // Change x-axis text color to white
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#ffffff", // Change y-axis text color to white
        },
      },
    },
  };

  // Sample data for the line chart for each month
  const dataForMonths = {
    "January 2023": [30, 40, 45, 50, 49, 60, 70, 91],
    "February 2023": [40, 35, 60, 70, 65, 75, 80, 85],
    "March 2023": [20, 25, 40, 55, 60, 70, 65, 75],
    // Add data for other months and years here...
  };

  const series = [
    {
      name: "Percentage",
      data: dataForMonths[selectedMonthYear],
    },
  ];

  return (
    <div className="app">
      <div className="controls">
        <select id="monthYearSelect" value={selectedMonthYear} onChange={handleMonthYearChange}>
          {months.map(month => (
            years.map(year => (
              <option key={`${month} ${year}`} value={`${month} ${year}`}>{`${month} ${year}`}</option>
            ))
          ))}
        </select>
      </div>

      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="line"  height={350} />
        </div>
      </div>
    </div>
  );
};

export default LineChartDemo;
